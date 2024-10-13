using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiSampleFinal.Models.LikePostModels;
using AutoMapper;
using BlogsApps.Server.Models;
using BlogsApps.Server.Repositories;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogsApps.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikePostsController : ControllerBase
    {
        private readonly ILikedPostRepository _likePostRepository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        //public LikePostsController(ILikedPostRepository likePostRepository, IMapper mapper)
        //{
        //    _likePostRepository = likePostRepository;
        //    _mapper = mapper;

        //}

        public LikePostsController(ILikedPostRepository likePostRepository, IMapper mapper, AppDbContext context) // Agrega el context aquí
        {
            _likePostRepository = likePostRepository;
            _mapper = mapper;
            _context = context ?? throw new ArgumentNullException(nameof(context)); // Asegúrate de que el context no sea null
        }


        // GET: api/LikePosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikePostDTO>>> GetLikePosts()
        {
            var likePosts = await _likePostRepository.GetAllLikePostsAsync();
            var likePostsDTO = _mapper.Map<IEnumerable<LikePostDTO>>(likePosts);
            return Ok(likePostsDTO);
        }

        // GET: api/LikePosts/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LikePostDTO>> GetLikePost(Guid id)
        {
            var likePost = await _likePostRepository.GetLikePostByIdAsync(id);
            if (likePost == null)
            {
                return NotFound();
            }
            var likePostDTO = _mapper.Map<LikePostDTO>(likePost);
            return Ok(likePostDTO);
        }

        // PUT: api/LikePosts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLikePost(Guid id, LikePostDTO likePostDTO)
        {
            if (id != likePostDTO.Id)
            {
                return BadRequest();
            }

            var likePost = _mapper.Map<LikedPost>(likePostDTO);
            await _likePostRepository.UpdateLikePostAsync(likePost);

            return NoContent();
        }

        // POST: api/LikePosts
        [HttpPost]
        public async Task<ActionResult<LikePostDTO>> PostLikePost(LikePostDTO likePostDTO)
        {
            var likePost = _mapper.Map<LikedPost>(likePostDTO);
            await _likePostRepository.AddLikePostAsync(likePost);
            return CreatedAtAction(nameof(GetLikePost), new { id = likePost.Id }, _mapper.Map<LikePostDTO>(likePost));
        }

        // DELETE: api/LikePosts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLikePost(Guid id)
        {
            if (!await _likePostRepository.LikePostExistsAsync(id))
            {
                return NotFound();
            }

            await _likePostRepository.DeleteLikePostAsync(id);
            return NoContent();
        }

        // GET: api/LikePosts/post/{postId}
        [HttpGet("post/{postId}")]
        public async Task<ActionResult<IEnumerable<LikePostDTO>>> GetLikePostsByPostId(Guid postId)
        {
            // Realiza la consulta directamente en el controlador
            var likedPosts = await (from lp in _context.LikedPosts
                                    join u in _context.Users on lp.UserId equals u.UserId
                                    where lp.PostId == postId
                                    select new LikePostDTO
                                    {
                                        Id = lp.Id,
                                        UserId = lp.UserId,
                                        PostId = (Guid)lp.PostId,
                                        UserName = u.Name,
                                        UserEmail = u.Email
                                    }).ToListAsync();

            if (likedPosts == null || !likedPosts.Any())
            {
                return NotFound(); // Si no hay resultados, devuelve un 404
            }

            return Ok(likedPosts); // Devuelve los resultados encontrados
        }

    }
}
