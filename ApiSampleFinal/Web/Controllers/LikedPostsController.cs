using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogsApps.Server.Models;

namespace BlogsApps.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikedPostsController : ControllerBase
    {
        private readonly ModelsDbContext _context;

        public LikedPostsController(ModelsDbContext context)
        {
            _context = context;
        }

        // GET: api/LikedPosts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikedPost>>> GetLikedPosts()
        {
            return await _context.LikedPosts.ToListAsync();
        }

        // GET: api/LikedPosts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LikedPost>> GetLikedPosts(int id)
        {
            var likedPosts = await _context.LikedPosts.FindAsync(id);

            if (likedPosts == null)
            {
                return NotFound();
            }

            return likedPosts;
        }

        // PUT: api/LikedPosts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLikedPosts(Guid id, LikedPost likedPosts)
        {
            if (id != likedPosts.Id)
            {
                return BadRequest();
            }

            _context.Entry(likedPosts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LikedPostsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LikedPosts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LikedPost>> PostLikedPosts(LikedPost likedPosts)
        {
            _context.LikedPosts.Add(likedPosts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLikedPosts", new { id = likedPosts.Id }, likedPosts);
        }

        // DELETE: api/LikedPosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLikedPosts(int id)
        {
            var likedPosts = await _context.LikedPosts.FindAsync(id);
            if (likedPosts == null)
            {
                return NotFound();
            }

            _context.LikedPosts.Remove(likedPosts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LikedPostsExists(Guid id)
        {
            return _context.LikedPosts.Any(e => e.Id == id);
        }
    }
}
