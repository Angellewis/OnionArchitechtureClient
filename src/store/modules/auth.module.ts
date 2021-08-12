
import { IUser } from "@/core/model";
import { UserRole } from "@/core/utils/enums";
import { Module } from "vuex";

const authModule: Module<any, any> = {
    state: {
        user: {
            id:1,
            name: 'Emmanuel',
            lastName: 'Jimenez',
            userName: 'admin',
            userRole: UserRole.ADMIN
        } as IUser,
    },
    getters: {
        isCurrentUserAdmin(state) {
            return state.user.userRole === UserRole.ADMIN;
        }
    },
    mutations: {

    },
    actions: {
    }
};

export default authModule;