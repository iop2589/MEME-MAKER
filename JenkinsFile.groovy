pipeline {
    agent any
    stages {
        stage('git clone') {
            git credentialsId: 'GitHub-iop2589', url: 'https://github.com/iop2589/MEME-MAKER'
        }
    }
}