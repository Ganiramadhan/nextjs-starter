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
                    # Stop & remove container lama kalau ada
                    docker rm -f ganipedia || true
                    
                    # Jalankan container baru
                    docker run -d \
                        --name ganipedia \
                        -p 3017:3017 \
                        ganipedia/next-starter:latest
                '''
            }
        }
    }
}
