using AutoMapper;
using Domain.Dtos;
using Domain.Entities;
using Domain.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SmartCity_API.Controllers
{
    /// <summary>
    /// Manages reviews left by users on tourist places.
    /// Supports fetching reviews for a place, creating a new review,
    /// and deleting a review (only by its author or an Admin).
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;

        public ReviewsController(IReviewRepository reviewRepository, IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets all reviews for a specific place, ordered by most recent first.
        /// </summary>
        /// <param name="placeId">The id of the place whose reviews are being requested.</param>
        /// <returns>A list of reviews for the given place.</returns>
        [HttpGet("place/{placeId}")]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetByPlaceId(int placeId)
        {
            var reviews = await _reviewRepository.GetByPlaceIdAsync(placeId);
            return Ok(_mapper.Map<IEnumerable<ReviewDto>>(reviews));
        }
        /// <summary>
        /// Creates a new review for a place. Requires the user to be authenticated.
        /// The review is automatically linked to the currently logged-in user.
        /// </summary>
        /// <param name="createDto">The review data (place id, rating 1-5, optional comment).</param>
        /// <returns>The newly created review.</returns>
        /// <response code="200">Review created successfully.</response>
        /// <response code="400">Rating is outside the valid 1-5 range.</response>
        /// <response code="401">User is not authenticated.</response>


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ReviewDto>> Create([FromBody] CreateReviewDto createDto)
        {
            if (createDto.Rating < 1 || createDto.Rating > 5)
                return BadRequest("Rating must be between 1 and 5.");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var review = _mapper.Map<Review>(createDto);
            review.UserId = userId;

            var created = await _reviewRepository.AddAsync(review);
            var dto = _mapper.Map<ReviewDto>(created);

            return CreatedAtAction(nameof(GetByPlaceId), new { placeId = created.PlaceId }, dto);
        }

        /// <summary>
        /// Deletes a review. Only the review's original author or an Admin can delete it.
        /// </summary>
        /// <param name="id">The id of the review to delete.</param>
        /// <response code="204">Review deleted successfully.</response>
        /// <response code="404">Review with the given id was not found.</response>
        /// <response code="403">The current user is neither the author nor an Admin.</response>

        [HttpDelete("{id}")]
        [Authorize]

        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _reviewRepository.GetByIdAsync(id);

            if (existing is null)
            {
                return NotFound("Review not found");

            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (existing.UserId != userId && !User.IsInRole("Admin"))
            {
                return Forbid();
            }

            await _reviewRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
