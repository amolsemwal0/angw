pipeline {
    agent any

    environment {
        // --- CONFIGURATION MATCHING YOUR MANUAL COMMAND ---
        IMAGE_NAME     = "tanmaysinghx/zero-angw:latest"
        CONTAINER_NAME = "zero-angw"
        PORT           = "6969"
        
        // Ngrok Auth Token (Store this in Jenkins Credentials)
        NGROK_AUTH     = credentials('ngrok-auth-token') 
    }

    stages {
        stage('Pull Latest Image') {
            steps {
                script {
                    echo "Pulling image: $IMAGE_NAME"
                    // 'sudo' is often required on Jenkins servers unless the user is in the docker group
                    sh "sudo docker pull $IMAGE_NAME"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    echo "Deploying container: $CONTAINER_NAME on port $PORT"
                    
                    // 1. Remove existing container (ignore error if it doesn't exist)
                    sh "sudo docker rm -f $CONTAINER_NAME || true"
                    
                    // 2. Run the new container
                    sh """
                        sudo docker run -d \
                        -p $PORT:$PORT \
                        --name $CONTAINER_NAME \
                        --restart always \
                        $IMAGE_NAME
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    // Wait a moment for Nginx to start
                    sleep 5
                    
                    // Check if the container is running and serving content
                    sh "curl -f http://localhost:$PORT/ || exit 1"
                    echo "✅ App is healthy and running on port $PORT"
                }
            }
        }

        // // Optional: Keep Ngrok if you want external access
        // stage('Start Ngrok Tunnel') {
        //     steps {
        //         sh '''
        //             pkill ngrok || true
        //             ngrok authtoken $NGROK_AUTH
        //             nohup ngrok http $PORT > ngrok.log &
        //             sleep 5
        //         '''
        //         script {
        //             def url = sh(script: "curl -s http://localhost:4040/api/tunnels | jq -r .tunnels[0].public_url", returnStdout: true).trim()
        //             echo "🌍 Public URL: $url"
        //         }
        //     }
        // }
    }

    post {
        success {
            echo "Pipeline executed successfully."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}