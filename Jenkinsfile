pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker-compose.build()
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker-compose.run('backend', 'npm test')
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker-compose.up('-d')
                }
            }
        }
    }
}
