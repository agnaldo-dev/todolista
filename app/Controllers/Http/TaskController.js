'use strict'

const Task = use("App/Models/Task")


//const { validateAll } = use('Validator')

class TaskController {

    async index({ view }) {

        const lista = await Task.all()

        return view.render('tasks', {
            title: 'Pagina de teste',
            lista: lista.toJSON()
        })
    }

    async store({ request, response, session }) {
        //   const validation = await validateAll(request.all(), {
        //      title: 'required|min:5|max:80',
        //      body: 'required|min:10|max:255'
        // })
        //   if (validation.fails()) {
        //    session.withErrors(validation.messages()).flashAll()
        //     return response.redirect('back')
        //   }
        const task = new Task()
        task.title = request.input('title')
        task.body = request.input('body')
        await task.save()

        session.flash({ notification: 'Gravado com sucesso!' })

        return response.redirect('/tasks')

    }
    async detail({ params, view }) {
        console.log(params.id)
        const task = await Task.find(params.id)
        console.log(task)
        return view.render('detail', {
            task: task
        })

    }
}

module.exports = TaskController