pipeline {
    agent {
        docker {
            image 'docker:24.0-cli' 
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_REGISTRY = "registry.ganipedia.xyz:3017"
        IMAGE_NAME = "ganipedia"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/ganiramadhan/ganipedia.git',
                    credentialsId: 'github-https-token'
                )
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG .
                """
            }
        }

        stage('Push to Registry') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-registry-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo "$DOCKER_PASS" | docker login $DOCKER_REGISTRY -u "$DOCKER_USER" --password-stdin
                    docker push $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                docker rm -f $IMAGE_NAME || true
                docker run -d --name $IMAGE_NAME -p 3017:3017 $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG
                """
            }
        }
    }
}
