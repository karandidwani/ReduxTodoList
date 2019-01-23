const initialState = {
    todos: [],
    id: 0
}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_TODO':
            var newState = {...state}
            newState.id++;
            return {
                ...newState,
                todos: [...state.todos, {todo: action.todo, id: newState.id}]
            };
        case 'DELETE_TODO':
            var todos = state.todos.filter(todo => todo.id !== +action.id)
            return {...state, todos};
        default:
            return state;
    }
}

const store = Redux.createStore(rootReducer);

$(document).ready(function () {

    $("ul").on("click", "button", function (e) {
        store.dispatch({
            type: 'DELETE_TODO',
            id: $(e.target).attr("id")
        });
        $(e.target).parent().remove();
    });


    $('#todoForm').on('submit', function (event) {
        event.preventDefault();
        var newTodoText = $("#todo").val();
        store.dispatch({
            type: 'ADD_TODO',
            todo: newTodoText
        });
        var currentState = store.getState();

        var newLi = $("<li>", {
            text: newTodoText,
            class: "list-group-item"
        });

        var deleteBtn = $("<button>", {
            text: "X",
            id: currentState.id,
            class: "btn-danger"
        });

        newLi.append(deleteBtn);
        $("#todos").append(newLi);
        $("#todoForm").trigger("reset");
    });
});
