const users = [
    {
        id: 1,
        firstname: 'Jakub',
        lastname: 'Tkaczyk',
        email: 'jtkaczyk@gmail.com',
        accountType: 'admin',
    },
    {
        id: 2,
        firstname: 'Maciej',
        lastname: 'Jebiewdenko',
        email: 'mjebie@gmail.com',
        accountType: 'moderator',
    },
    {
        id: 3,
        firstname: 'Julia',
        lastname: 'Kowalska',
        email: 'jkowalska@gmail.com',
        accountType: 'user',
    },
]

const getUserTable = (users) => {
    const result = users.map(user => (
        <tr key={user.id}>
            <td>{user.firstname}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.accountType}</td>
            <td>
                <div class="btn-group">
                    <a href="/user/roleuser/<%= user._id %>" type="button" class="btn btn-primary btn-sm">{ user.accountType === "user" ? "Ban" : "User"}</a>
                    <a href="/user/rolemoder/<%= user._id %>" type="button" class="btn btn-secondary btn-sm">Moder</a>
                    <a href="/user/roleadmin/<%= user._id %>" type="button" class="btn btn-success btn-sm">Admin</a>
                </div>
            </td>
        </tr>
    ))
    return result
}

const AdminPanel = (props) => {
    return (
        <div>
            <table class="table table-striped">
                    <thead>
                        <tr>
                          <th scope="col">Imie</th>
                          <th scope="col">Nazwisko</th>
                          <th scope="col">Email</th>
                          <th scope="col">Rola</th>
                          <th scope="col">Akcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getUserTable(users)}
                    </tbody>
                </table>
        </div>
    )
}

export default AdminPanel