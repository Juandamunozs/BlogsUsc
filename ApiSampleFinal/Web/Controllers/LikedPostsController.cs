using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiSampleFinal.Models.LikePostModels;
using AutoMapper;
using BlogsApps.Server.Models;
using BlogsApps.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BlogsApps.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikePostsController : ControllerBase
    {
        private readonly ILikedPostRepository _likePostRepository;
        private readonly IMapper _mapper;

        public LikePostsController(ILikedPostRepository likePostRepository, IMapper mapper)
        {
            _likePostRepository = likePostRepository;
            _mapper = mapper;
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
    }
}
