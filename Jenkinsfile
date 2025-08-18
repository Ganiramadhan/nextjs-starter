pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "registry.ganipedia.xyz:3017"
        IMAGE_NAME = "ganipedia"
        IMAGE_TAG = "latest"
    }

    options {
        skipDefaultCheckout()
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

        stage('Set Commit Hash') {
            steps {
                script {
                    env.COMMIT_HASH = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    echo "Commit hash: ${env.COMMIT_HASH}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG \
                             -t $DOCKER_REGISTRY/$IMAGE_NAME:$COMMIT_HASH .
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
                    docker push $DOCKER_REGISTRY/$IMAGE_NAME:$COMMIT_HASH
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                docker rm -f $IMAGE_NAME || true
                docker run -d \
                    --name $IMAGE_NAME \
                    -p 3017:3017 \
                    --restart always \
                    $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG
                """
            }
        }
    }
}
