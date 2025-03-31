pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my_app_image'  // Nombre de la imagen local
        COMPOSE_FILE = 'docker-compose.yml'  // Archivo docker-compose
    }

    stages {
        stage('Clonar código') {
            steps {
                git branch: 'main', url: 'https://github.com/JordanR17/CRUD-CUSTOMERS.git'  
            }
        }

        stage('Verificar cambios en el código') {
            steps {
                script {
                    def changes = sh(script: 'git diff --quiet HEAD~1 HEAD || echo "changes"', returnStdout: true).trim()
                    if (changes == "changes") {
                        env.BUILD_IMAGE = "true"
                    } else {
                        env.BUILD_IMAGE = "false"
                    }
                }
            }
        }

        stage('Construir imagen de la aplicación (Si hay cambios)') {
            when {
                expression { env.BUILD_IMAGE == "true" }
            }
            steps {
                script {
                    sh 'docker build -t $IMAGE_NAME .'  // Construye la imagen si hay cambios
                }
            }
        }

        stage('Levantar aplicación con Docker Compose') {
            steps {
                script {
                    sh 'docker compose down'  // Baja los contenedores anteriores
                    sh 'docker compose up -d'  // Usa la imagen existente sin reconstruir
                }
            }
        }

        stage('Verificar ejecución') {
            steps {
                script {
                    sh 'docker ps'  // Muestra los contenedores corriendo
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Despliegue exitoso"
        }
        failure {
            echo "❌ Hubo un error en el pipeline"
        }
    }
}
