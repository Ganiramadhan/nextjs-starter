pipeline {
    agent any

    environment {
        IMAGE_NAME = "ganipedia/next-starter"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Version') {
            steps {
                script {
                    def commitMsg = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    echo "Last commit: ${commitMsg}"

                    def lastVersion = sh(
                        script: 'curl -s "https://hub.docker.com/v2/repositories/' + env.IMAGE_NAME + '/tags?page_size=100" ' +
                                '| jq -r \'.results[].name\' ' +
                                '| grep -E \'^v[0-9]+\\.[0-9]+\\.[0-9]+$\' ' +
                                '| sed \'s/v//\' ' +
                                '| sort -V ' +
                                '| tail -n 1',
                        returnStdout: true
                    ).trim()

                    if (!lastVersion) { lastVersion = "0.0.0" }
                    echo "Last version: v${lastVersion}"

                    def (major, minor, patch) = lastVersion.tokenize('.')*.toInteger()

                    if (commitMsg.contains("BREAKING CHANGE") || commitMsg.toLowerCase().startsWith("feat!")) {
                        major += 1; minor = 0; patch = 0
                    } else if (commitMsg.toLowerCase().startsWith("feat")) {
                        minor += 1; patch = 0
                    } else if (commitMsg.toLowerCase().startsWith("fix")) {
                        patch += 1
                    } else {
                        patch += 1
                    }

                    def version = "v${major}.${minor}.${patch}"
                    env.VERSION = version
                    echo "New version: ${version}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build --label version=$VERSION \
                        -t $IMAGE_NAME:$VERSION \
                        -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:$VERSION
                        docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker rm -f next-starter || true
                    docker run -d \
                        --name next-starter \
                        -p 3017:3000 \
                        --restart unless-stopped \
                        $IMAGE_NAME:$VERSION
                '''
            }
        }
    }
}
