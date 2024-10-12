using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiSampleFinal.Models.CommentModels; // Asegúrate de tener este espacio de nombres para los DTOs de comentario
using AutoMapper;
using BlogsApps.Server.Models;
using BlogsApps.Server.Repositories; // Asegúrate de que existe un repositorio para los comentarios
using Microsoft.AspNetCore.Mvc;

namespace BlogsApps.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository; // Asegúrate de tener un repositorio de comentarios
        private readonly IMapper _mapper;

        public CommentsController(ICommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetComments()
        {
            var comments = await _commentRepository.GetAllCommentsAsync();
            var commentsDTO = _mapper.Map<IEnumerable<CommentDTO>>(comments);
            return Ok(commentsDTO);
        }

        // GET: api/Comments/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDTO>> GetComment(Guid id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            var commentDTO = _mapper.Map<CommentDTO>(comment);
            return Ok(commentDTO);
        }

        // PUT: api/Comments/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(Guid id, CommentDTO commentDTO)
        {
            if (id != commentDTO.Id)
            {
                return BadRequest();
            }

            var comment = _mapper.Map<Comment>(commentDTO);
            await _commentRepository.UpdateCommentAsync(comment);

            return NoContent();
        }

        // POST: api/Comments
        [HttpPost]
        public async Task<ActionResult<CommentDTO>> PostComment(CommentDTO commentDTO)
        {
            var comment = _mapper.Map<Comment>(commentDTO);
            await _commentRepository.AddCommentAsync(comment);
            return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, _mapper.Map<CommentDTO>(comment));
        }

        // DELETE: api/Comments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            if (!await _commentRepository.CommentExistsAsync(id))
            {
                return NotFound();
            }

            await _commentRepository.DeleteCommentAsync(id);
            return NoContent();
        }
    }
}
