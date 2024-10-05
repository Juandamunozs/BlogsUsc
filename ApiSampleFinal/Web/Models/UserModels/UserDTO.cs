namespace ApiSampleFinal.Models.UserModels
{
    public class UserDTO
    {
        public Guid Id { get; set; }  // El identificador del usuario

        public string Name { get; set; }  // Nombre completo del usuario

        public string Email { get; set; }  // Email del usuario

        public string Password { get; set; } // Password del user

        public string Role { get; set; }  // Rol del usuario, como Admin, User, etc.
    }
}
