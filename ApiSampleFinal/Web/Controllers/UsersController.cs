using System.Collections.Generic;
using System.Threading.Tasks;
using ApiSampleFinal.Models.UserModels;
using AutoMapper;
using BlogsApps.Server.Models;
using BlogsApps.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BlogsApps.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();
            var usersDTO = _mapper.Map<IEnumerable<UserDTO>>(users);
            return Ok(usersDTO);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var userDTO = _mapper.Map<UserDTO>(user);
            return Ok(userDTO);
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, UserDTO userDTO)
        {
            if (id != userDTO.Id)
            {
                return BadRequest();
            }

            var user = _mapper.Map<User>(userDTO);
            await _userRepository.UpdateUserAsync(user);

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<UserDTO>> PostUser(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            await _userRepository.AddUserAsync(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, _mapper.Map<UserDTO>(user));
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            if (!await _userRepository.UserExistsAsync(id))
            {
                return NotFound();
            }

            await _userRepository.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
