export const users = [
    {
        email: "manager@sdc.com",
        password: "something",
        type: "manager"
    },
    {
        email: "doc@clinic.com",
        password: "something",
        type: "filler"
    }
]

export const findUser = (email: string, password: string) => {
    const user = users.find((user) => {
        return email === user.email && password === user.password;
    })
    if(user) {
        return user.type;
    }
    else{
        return 'not found';
    }
}

export const bothManagerFiller = [ "manager", "filler" ];
export const onlyManager = [ "manager" ];
export const onlyFiller = [ "filler" ];