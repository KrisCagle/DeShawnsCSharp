namespace DeShawnsDogWalking.Models.DTOs;
public class WalkerCityDTO
{
    public int Id { get; set; }
    public int CityId { get; set; }
    public List<CityDTO> Cities { get; set; }
}