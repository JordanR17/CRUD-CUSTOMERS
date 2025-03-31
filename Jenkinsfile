pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'tu-credencial-de-git', url: 'https://github.com/JordanR17/CRUD-CUSTOMERS.git'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
