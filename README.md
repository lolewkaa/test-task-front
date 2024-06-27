# Test task for the Junior Frontend Developer position in Revamp IT

### Todo List
- Client ToDo **CRUD**
- Each ToDo has **title** and **description**
- ToDos can have **infinite nesting**
- At least one ToDo must be added by default

### Development
- React
- TypeScript
- Redux toolkit
- Material UI

После заполнения полей и нажатия на кнопку "Добавить", создается основная задача имеющая флаг isSubTask: false. Задача добавляется в массив todos, который фильтрует основные задачи от подзадач.  
При клике по кнопке "Add subtask" открывается попап с полями для заполнения. После отправки создается подзадача. Все подзадачи будут иметь флаг isSubTask: true и id родительской задачи.  
Подзадачи можно просмотреть при клике по кнопке 'Show dubtasks'.

## Gh-pages

https://lolewkaa.github.io/test-task-front/
