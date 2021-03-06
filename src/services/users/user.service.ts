import User from "../../models/User"

export function UserService () {
    return {
        ...get()
    }
}

function get () {
    return {
        me: async (userId: string) => {
            try {

                const user = await User.findById(userId, { username:1, email: 1 })

                return user

            } catch (err) {
                return new Error(err)
            }
        },
        users: async () => {
            try {

                const users = await User.find({}, {password: 0})

                return users


            } catch (err) {
                return new Error(err)
            }
        }
    }
}