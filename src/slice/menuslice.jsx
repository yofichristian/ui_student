import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    openSidebar: true,
    activetab: null,
    listtab: [],
    listmenu: [],
    listopenmenu: [],
    itemmenu: null,
    liststate: [],
    projectid: null,
    childid: null,
    modalid: -99,
    dataheader: null,
    dataadditional: null,
    datachild: null,
    permissions: null,
};

export const menuSlice = createSlice({
    name: "menudemoyofi",
    initialState: initialState,
    reducers: {
        // clearRedux(state, action) {
        clearRedux(state) {
            localStorage.clear();
            state.liststate = [];
            state.modalid = null;
            state.projectid = null;
            state.dataheader = null;
            state.permissions = null;
            return state;
        },
        clearStateModule(state, action) {
            const modulename = action.payload.modulename;
            // console.log("clear state module", modulename);
            state.liststate = state.liststate
                .filter( e => e.moduleid !== modulename );
            // console.log(state.liststate);
            return state;
        },
        resetMenu(state, action) {
            return initialState;
        },
        toggleSidebar(state, action) {
            // console.log("debug 88 toggleSidebar", state.open);
            state.openSidebar = !state.openSidebar;
            // localStorage.setItem("openSidebar", state.openSidebar);
        },
        savemenu(state, action) {
            state.listmenu = action.payload.listmenu;
            // localStorage.setItem("listmenu", JSON.stringify(state.listmenu));
        },
        clearlistmenu(state, action) {
            state.listmenu = [];
            // localStorage.removeItem("listmenu");
        },
        setactivetab(state, action) {
            state.activetab = action.payload.activetab;
            if (state.listtab === null) {
                state.listtab = [];
            }
            const temp = state.listtab.filter(item => item.id === action.payload.activetab.id);
            if (temp.length === 0) {
                state.listtab = [...state.listtab, action.payload.activetab];
            }
            localStorage.setItem("menudemoyofi", action.payload.activetab.title);
            localStorage.setItem("pathstresstesting", action.payload.activetab.path);
        },
        closetab(state, action) {
            state.activetab = null;
            state.listtab = state.listtab.filter(item => item.id != action.payload.activetab.id);
        },
        addopensubmenu(state, action) {
            if (state.listopenmenu === null) {
                state.listopenmenu = [];
            }
            if (!state.listopenmenu.includes(action.payload.id)) {
                state.listopenmenu = [...state.listopenmenu, action.payload.id];
            }
        },
        removeopensubmenu(state, action) {
            state.listopenmenu = state.listopenmenu.filter(item => item != action.payload.id);
        },
        saveState(state, action) {
            let data = action.payload;

            //find existing data
            const temp1 = state.liststate.filter(e => e.moduleid === data.moduleid);
            if (temp1.length>0) {
                data = {
                    ...temp1[0],
                    ...action.payload
                }
                // console.log("debug 8 founded", JSON.stringify(data));
            }

            //push new data to list-state
            const temp = state.liststate.filter(e => e.moduleid !== data.moduleid);
            state.liststate = [
                ...temp,
                data
            ];
            // console.log("debug state 2", JSON.stringify(state.liststate));
        },
        openModalAdd(state, action) {
            state.modalid = action.payload.modalid;
            state.dataheader = action.payload.dataheader;
            state.dataadditional = action.payload.dataadditional;
        },
        openModalEdit(state, action) {
            state.modalid = action.payload.modalid;
            state.projectid = action.payload.projectid;
            state.dataheader = action.payload.dataheader;
            state.dataadditional = action.payload.dataadditional;
            // state.childid = action.payload.childid;
        },
        openModalChildAdd(state, action) {
            state.modalid = action.payload.modalid;
            state.projectid = action.payload.projectid;
            state.dataheader = action.payload.dataheader;
        },
        openModalChildEdit(state, action) {
            state.modalid = action.payload.modalid;
            state.projectid = action.payload.projectid;
            state.childid = action.payload.childid;
            state.dataheader = action.payload.dataheader;
            state.datachild = action.payload.datachild;
        },
        closeModalDialog(state) {
            state.modalid = -999;
        },
        openChild(state, action) {
            state.projectid = action.payload.projectid;
            state.dataheader = action.payload.dataheader;
            // state.childid = action.payload.childid;
        },
        clearDataAdditional(state) {
            state.dataadditional = null;
            return state;
        },
        savePermission(state,action) {
            // console.log(JSON.stringify(action.payload));
            state.permissions = action.payload;
            return state;
        },
        clearPermission(state) {
            state.permissions = null;
            return state;
        },

    },
});

export const {
    clearRedux,clearStateModule,
    resetMenu, savemastermenu, savemenu,
    clearlistmenu, setactivetab,
    closetab, addopensubmenu, removeopensubmenu,
    toggleSidebar, saveState,
    openModalAdd, closeModalDialog,
    openModalEdit, openChild,
    openModalChildAdd, openModalChildEdit,clearDataAdditional,
    savePermission, clearPermission
} = menuSlice.actions;

export default menuSlice.reducer;

