using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ApiSampleFinal.Models.PostModels;
using BlogsApps.Server.Models;
using BlogsApps.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BlogsApps.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;

        public PostsController(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var posts = await _postRepository.GetAllPostsAsync();
            var postsDTO = _mapper.Map<IEnumerable<PostDTO>>(posts);
            return Ok(postsDTO);
        }

        // GET: api/Posts/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(Guid id)
        {
            var post = await _postRepository.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            var postDTO = _mapper.Map<PostDTO>(post);
            return Ok(postDTO);
        }

        // PUT: api/Posts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(Guid id, PostDTO postDTO)
        {
            if (id != postDTO.Id)
            {
                return BadRequest();
            }

            var post = _mapper.Map<Post>(postDTO);
            await _postRepository.UpdatePostAsync(post);

            return NoContent();
        }

        // POST: api/Posts
        [HttpPost]
        public async Task<ActionResult<PostDTO>> PostPost(PostDTO postDTO)
        {
            var post = _mapper.Map<Post>(postDTO);
            await _postRepository.AddPostAsync(post);
            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, _mapper.Map<PostDTO>(post));
        }

        // DELETE: api/Posts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            if (!await _postRepository.PostExistsAsync(id))
            {
                return NotFound();
            }

            await _postRepository.DeletePostAsync(id);
            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdatePostStatus(Guid id, [FromBody] PostDTO postDTO)
        {
            if (id != postDTO.Id)
            {
                return BadRequest("ID mismatch.");
            }

            if (string.IsNullOrEmpty(postDTO.Status))
            {
                return BadRequest("Status is required.");
            }

            // Verifica si el post existe
            var existingPost = await _postRepository.GetPostByIdAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            // Actualiza el status
            existingPost.Status = postDTO.Status;
            await _postRepository.UpdatePostAsync(existingPost);

            // Devuelve el post actualizado
            var updatedPostDTO = _mapper.Map<PostDTO>(existingPost);
            return Ok(updatedPostDTO);  // Devuelve el objeto actualizado
        }

    }
}
