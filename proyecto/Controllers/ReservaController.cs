using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;
using Logica;
using ReservaModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SignalR;
using proyecto.Hubs;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ReservaController : ControllerBase
{
    private readonly ReservaService _reservaService;

    private readonly IHubContext<SignalHub> _hubContext;

    public ReservaController(HotelContext context, IHubContext<SignalHub> hubContext)
    {
        _reservaService = new ReservaService(context);
        _hubContext = hubContext;
    }

    // GET: api/Persona​
    [HttpGet]
    public ActionResult<ReservaViewModel> Gets()
    {
        var response = _reservaService.ConsultarTodos();
        if (response.Error)
        {
            ModelState
            .AddModelError("Error al consultar la Reserva",
            response.Mensaje);
            var detallesproblemas = new ValidationProblemDetails(ModelState);
            detallesproblemas.Status = StatusCodes.Status500InternalServerError;
            return BadRequest(detallesproblemas);
        }
        else
        {
            return Ok(response.Reservas.Select(p => new ReservaViewModel(p)));
        }
    }

    // GET: api/Persona/5​
    [HttpGet("{Cedula}")]
    public ActionResult<ReservaViewModel> Get(string Cedula)
    {
        var reserva = _reservaService.BuscarxIdentificacion(Cedula);
        if (reserva == null) {return NotFound();}else{
            return Ok(reserva.Reservas.Select(p => new ReservaViewModel(p)));
        }
    }

    // POST: api/Persona​
    [HttpPost]
    public async Task<ActionResult<ReservaViewModel>> Post(ReservaInputModel reservaInput)
    {
        Reserva reserva = MapearReserva(reservaInput);
        var response = _reservaService.Guardar(reserva);
        if (response.Error)
        {
            ModelState
                .AddModelError("Error al guardar la Reserva", response.Mensaje);
            var detallesproblemas = new ValidationProblemDetails(ModelState);
            detallesproblemas.Status = StatusCodes.Status500InternalServerError;
            return BadRequest(detallesproblemas);
        }
        var reservaview = new ReservaViewModel (response.Reserva);
        await _hubContext.Clients.All.SendAsync("reservaRegistrada", reservaview);
        return Ok (reservaview);
    }

    // DELETE: api/Persona/5​
    [HttpDelete("{idreserva}")]
    public ActionResult<string> Delete(string idreserva)
    {
        string mensaje = _reservaService.Eliminar(idreserva);
        return Ok(mensaje);
    }

    private Reserva MapearReserva(ReservaInputModel reservaInput)
    {
        var reserva =
            new Reserva {
                IdReserva = reservaInput.IdReserva,
                IdHabitacion = reservaInput.IdHabitacion,
                FechaReserva = reservaInput.FechaReserva,
                Cedula = reservaInput.Cedula,
                Iva = reservaInput.Iva,
                Total = reservaInput.Total,
                FechaEntrada = reservaInput.FechaEntrada,
                FechaSalida = reservaInput.FechaSalida,
                Dias = reservaInput.Dias,
            };
        return reserva;
    }
}
