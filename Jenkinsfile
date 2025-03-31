pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                url: 'https://github.com/JordanR17/CRUD-CUSTOMERS.git'
            }
        }
        stage('Verify Git') {
            steps {
                sh 'git status'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
