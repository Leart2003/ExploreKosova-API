using AutoMapper;
using Domain.Dtos;
using Domain.Interface;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SmartCity_API.Controllers
{
    /// <summary>
    /// Provides endpoints for retrieving and managing places.
    /// </summary>
    
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly IPlaceRepository _placeRepository;
        private readonly IReviewRepository _reviewRepository;

        private readonly IMapper _mapper;
        /// <summary>
        /// Initializes a new instance of the <see cref="PlacesController"/> class.
        /// </summary>
        /// <param name="placeRepository">
        /// Repository used to access and manage places.
        /// </param>
        /// <param name="reviewRepository">
        /// Repository used to retrieve review and rating information.
        /// </param>
        /// <param name="mapper">
        /// AutoMapper instance used to map entities to DTOs.
        /// </param>
        public PlacesController(IPlaceRepository placeRepository, IReviewRepository reviewRepository, IMapper mapper)
        {
            _placeRepository = placeRepository;

            _reviewRepository = reviewRepository;

            _mapper = mapper;

        }
        /// <summary>
        /// Retrieves all places along with their average ratings.
        /// </summary>
        /// <returns>
        /// A collection of <see cref="PlaceDto"/> objects containing place information
        /// and their average ratings.
        /// </returns>
        /// <response code="200">
        /// The places were successfully retrieved.
        /// </response>

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceDto>>> GetAll()
        {
            var places = await _placeRepository.GetPlacesAsync();
            var dtos = new List<PlaceDto>();

            foreach (var place in places)
            {
                var dto = _mapper.Map<PlaceDto>(place);
                dto.AverageRating = Math.Round(await _reviewRepository.GetAverageRatingAsync(place.Id), 1);
                dtos.Add(dto);
            }

            return Ok(dtos);

        }

        [HttpGet("nearby")]
        public async Task<ActionResult<IEnumerable<PlaceDto>>> GetNearby(
            [FromQuery] double latitude,
            [FromQuery] double longitude,
            [FromQuery] double radiusKm = 50,
            [FromQuery] int? categoryId = null)
        {
            if (radiusKm <= 0)
            {
                return BadRequest("radiusKm must be greater than 0.");
            }

            var places = await _placeRepository.GetNearbyAsync(latitude, longitude, radiusKm, categoryId);
            var dtos = new List<PlaceDto>();

            foreach (var place in places)
            {
                var dto = _mapper.Map<PlaceDto>(place);
                dto.AverageRating = Math.Round(await _reviewRepository.GetAverageRatingAsync(place.Id), 1);
                dto.DistanceKm = Math.Round(CalculateDistanceForDisplay(latitude, longitude, place.Latitude, place.Longitude), 1);
                dtos.Add(dto);
            }

            return Ok(dtos);
        }

        [HttpGet("{id}")]

        /// <summary>
        /// Retrieves a specific place by its identifier along with its average rating.
        /// </summary>
        /// <param name="id">The unique identifier of the place.</param>
        /// <returns>
        /// The requested <see cref="PlaceDto"/> if the place exists.
        /// </returns>
        /// <response code="200">
        /// The place was successfully retrieved.
        /// </response>
        /// <response code="404">
        /// No place with the specified identifier was found.
        /// </response>
        public async Task<ActionResult<PlaceDto>> GetById(int id)
        {
            var place = await _placeRepository.GetPlaceById(id);

            if (place == null)
            {
                return NotFound($"Place with id {id} was not found.");
            }
            var dto = _mapper.Map<PlaceDto>(place);
            dto.AverageRating =  Math.Round(await _reviewRepository.GetAverageRatingAsync(place.Id), 1);


            return Ok(dto);
        }
        /// <summary>
        /// Updates an existing place.
        /// </summary>
        /// <param name="id">The unique identifier of the place to update.</param>
        /// <param name="updateDto">
        /// Data containing the updated information for the place.
        /// </param>
        /// <returns>
        /// No content if the place was successfully updated.
        /// </returns>
        /// <response code="204">
        /// The place was successfully updated.
        /// </response>
        /// <response code="401">
        /// The user is not authenticated.
        /// </response>
        /// <response code="403">
        /// The authenticated user does not have the Admin role.
        /// </response>
        /// <response code="404">
        /// No place with the specified identifier was found.
        /// </response>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] CreatePlaceDto updateDto)
        {
            var existing = await _placeRepository.GetPlaceById(id);

            if (existing is null)
            {
                return NotFound("Place not found");
            };
            _mapper.Map(updateDto, existing);

            await _placeRepository.UpdateAsync(existing);
            return NoContent();
        }
        /// <summary>
        /// Deletes an existing place.
        /// </summary>
        /// <param name="id">The unique identifier of the place to delete.</param>
        /// <returns>
        /// No content if the place was successfully deleted.
        /// </returns>
        /// <response code="204">
        /// The place was successfully deleted.
        /// </response>
        /// <response code="401">
        /// The user is not authenticated.
        /// </response>
        /// <response code="403">
        /// The authenticated user does not have the Admin role.
        /// </response>
        /// <response code="404">
        /// No place with the specified identifier was found.
        /// </response>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _placeRepository.GetPlaceById(id);

            if (existing is null)
            {
                return NotFound("Place not found");
            }
            ;
            

            await _placeRepository.DeleteAsync(id);
            return NoContent();
        }

        private static double CalculateDistanceForDisplay(double lat1, double lon1, double lat2, double lon2)
        {
            double latDiffKm = (lat2 - lat1) * 111.0;
            double lonDiffKm = (lon2 - lon1) * 111.0 * Math.Cos(lat1 * Math.PI / 180);
            return Math.Sqrt(latDiffKm * latDiffKm + lonDiffKm * lonDiffKm);
        }



    }
}
