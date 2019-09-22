/* eslint-disable no-fallthrough */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable no-case-declarations */

// The initial state of the App
export const initialState = {
  projects: [
    // dummy data: ubadah has to add data here
    {
      title: 'first',
      id: 1,
      logs: [],
      deletedLogs: [],
    },
    {
      title: 'second',
      id: 2,
      logs: [],
      deletedLogs: [],
    },

    {
      title: 'third',
      id: 3,
      logs: [],
      deletedLogs: [],
    },
    {
      title: 'fourth',
      id: 4,
      logs: [],
      deletedLogs: [],
    },
  ],

  users: [],
  // currentUser: '',
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_UP':
      const updatedUsersArray = state.users.filter(() => true);
      updatedUsersArray.push(action.user);
      return {
        ...state,
        users: updatedUsersArray,
      };

    case 'LOG_IN':
      const { email, password } = action.user;
      const userFound = state.users.find(usr => {
        const userEmail =
          email.indexOf('@') === -1 ? usr.username : usr.emailId;
        return userEmail === email;
      });
      if (userFound && userFound.password === password) {

        return {
          ...state,
          currentUser: userFound.firstName + ' ' + userFound.lastName,
        };
      } else {
        alert('user not found');
      }

    case 'LOG_OUT':
      // removing the currentuser or logout
      return {
        ...state,
        currentUser: '',
      };

    // ============== ProjectLogs ============= //
    case 'ADD_PROJECT_LOG':
      const { item, price, shop, payments } = action;
      // making a copy of projectLogs without mutating state
      const projectLists = state.projects.map(project => {
        let projectLogs = project.logs.filter(() => true);

        const newLog = {
          item,
          price,
          shop,
          payments,
          username: state.currentUser,
          date: new Date(),
          id: Math.random(),
          prevLogs: [],
        };
        if (action.projectTitle === project.title) {
          projectLogs = project.logs.filter(() => true);
          projectLogs.push(newLog);
        }
        return Object.assign({}, project, {
          logs: projectLogs,
        });
      });
      return {
        ...state,
        projects: projectLists,
      };

    // ========== Delete logs ============ //
    case 'DELETE_LOG':
      // find deleted log
      // let deletedLog;
      const projectsCopy = state.projects.filter(() => true);

      const updatedProject = projectsCopy.map(project => {
        // making a copy of projectLogs without mutating state
        let newLog = project.logs.filter(() => true);

        if (action.projTitle === project.title) {
          // add deleted logs to deleted Log array
          project.deletedLogs = [
            ...project.deletedLogs,
            project.logs.find(log => log.id === action.id),
          ];
          // remove deledted log from logs array
          newLog = project.logs.filter(log => log.id !== action.id);
        }

        return Object.assign({}, project, {
          logs: newLog,
        });
      });
      return { ...state, projects: updatedProject };

    // =============== Edit log ================= //
    case 'EDIT_LOG':
      const editedProject = state.projects.map(project => {
        // making a copy of projectLogs without mutating state
        let newLog = project.logs.filter(() => {
          return true;
        });

        if (action.projectTitle === project.title) {
          let prevLogArray = [...action.prevLog.prevLogs];
          // clearing nested prevLogs array
          action.prevLog.prevLogs = [];
          prevLogArray = [...prevLogArray, action.prevLog];

          newLog = project.logs.filter(log => {
            // prevLogs.push(log.prevLog);
            return log.id !== action.log.id;
          });
          const { item, price, shop, payments, id } = action.log;
          const editedLog = {
            item,
            price,
            shop,
            payments,
            date: new Date(),
            id,
            username: 'static username',
            prevLogs: prevLogArray,
            modifiedBy: 'user logged in',
          };
          newLog.push(editedLog);

          // let sortedLog = newLog.sort((a, b) => a.date - b.log);
        }
        // console.log(newLog);
        return Object.assign({}, project, {
          logs: newLog,
        });
      });

      return {
        ...state,
        projects: editedProject,
      };

    default:
      return state;
  }
}

export default appReducer;
