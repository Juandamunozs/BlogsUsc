﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogsApps.Server.Models
{
    public class User
    {
        // ID
        [Key]
        public Guid UserId { get; set; }

        // Name
        [Column(TypeName = "nvarchar(100)")]
        public required string Name { get; set; }

        // Email
        [EmailAddress]
        [Column(TypeName = "nvarchar(100)")]
        public required string Email { get; set; }

        // Password
        [Column(TypeName = "nvarchar(100)")]
        public required string Password { get; set; }

        // Role
        [Column(TypeName = "nvarchar(100)")]
        public required string Role { get; set; }
    }
}
