job('n-ippo.jp') {
    scm {
        git('https://github.com/NotReady/cf_test.git') {  node ->
            node / gitConfigName('DSL User')
            node / gitConfigEmail('loreley.lala+jenkins_work@gmail.com')
        }
    }
    triggers {
        scm('H/5 * * * *')
    }
    wrappers {
        nodejs('nodejs_V12')
    }
    steps {
        shell("npm install")
        shell("npm test")
    }
}
