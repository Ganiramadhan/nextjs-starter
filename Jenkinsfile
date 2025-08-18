pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ganipedia/next-starter:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker rm -f next-starter || true
                    
                    docker run -d \
                        --name next-starter \
                        -p 3017:3000 \
                        ganipedia/next-starter:latest
                '''
            }
        }
    }
}
