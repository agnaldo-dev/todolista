'use strict'

const Task = use("App/Models/Task")

//const { validateAll } = use('Validator')

class TaskController {

    async index({ params, response, view, session }) {
        try {
            const pageNumber = params.page === 'NaN' ? 1 : params.page

            const tasks = await Task.query()
                .orderBy("id", "desc")
                .paginate(pageNumber, 3)

            return view.render('tasks', {
                title: 'Lista de Tarefas',
                tasks: tasks.toJSON()
            })

        } catch (error) {
            console.log(error)

            session.flash({
                notification: {
                    message: "Failed to fetch all articles",
                },
            })

            return response.redirect("back");
        }
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
    async remove({ params, response, session }) {
        const task = await Task.find(params.id)
        task.delete()
        session.flash({ notification: 'Task removido' })
        return response.redirect('/tasks')

    }
}

module.exports = TaskController