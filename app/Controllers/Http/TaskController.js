'use strict'

class TaskController {
    index({ view }) {
        const lista = [
            { title: 'teste', body: 'fazer algo' },
            { title: 'teste dois', body: 'fazer alguma coisa' }

        ]
        return view.render('task', {
            title: 'Pagina de teste',
            lista: lista
        })
    }
}

module.exports = TaskController