import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Calendar, DayHeaderContentArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MidiaService } from '../service/midia.service';
import { AvaliacaoService } from 'app/service/avaliacao.service';
import { IUsuario } from 'app/model/IUsuario.model';
import { UsuarioService } from 'app/service/usuario-.service';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.css']
})
export class TelaPerfilComponent implements AfterViewInit {
  @ViewChild('calendar')
  calendarEl!: ElementRef;
  events: EventInput[] = [];
  selectedDate: string = '';
  newEvent: { title: string, date: string, description: string, time: string } = { title: '', date: '', description: '', time: '' };
  eventModal!: HTMLElement;
  chatModal!: HTMLElement;
  midia: Array<any> = [];
  avaliacao: Array<any> = [];

  usuario: IUsuario ={
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    telefone: '',
    genero: ''
  };

  constructor(private serviceM:MidiaService, private serviceA:AvaliacaoService, private usuarioS: UsuarioService) { }

  ngAfterViewInit() {
    this.buscar();
    this.serviceM.listar().subscribe(m => this.midia = m);
    this.serviceA.listar().subscribe(a => this.avaliacao = a);
    const today = new Date(); // Obtém a data atual
    this.chatModal = document.getElementById('chatModal')!;
    const calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: today,
      locale: 'pt-br',
      buttonText: {
        today: 'Hoje',
        dayGridMonth: 'Mês',
        timeGridWeek: 'Semana',
        timeGridDay: 'Dia',
        listWeek: 'Lista Evento'
      },

      navLinks: true,
      editable: true,
      dayMaxEvents: true,
      dayHeaderContent(arg: DayHeaderContentArg) {
        return '' + arg.text + '';
      },
      events: this.events,
      dateClick: (arg: any) => this.handleDateClick(arg)
    });

    calendar.render();
    this.eventModal = document.getElementById('eventModal')!;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
    .fc-daygrid-day-text .fc-toolbar-title, .fc-daygrid-day-number {
        color: black; /* Altere para a cor desejada */
        text-decoration: none;
      }
    `;


    this.calendarEl.nativeElement.appendChild(styleElement);
  }

  buscar(): void{
      this.usuarioS.buscarUsuario(3).subscribe(retorno =>{
        this.usuario = retorno;
      })
  }

  handleDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.eventModal.style.display = 'block';
  }

  closeModal() {
    this.eventModal.style.display = 'none';
    this.newEvent = { title: '', date: '', description: '', time: '' }; // Limpa os campos ao fechar o modal
  }

  openChatModal() {
    this.chatModal.style.display = 'block';
  }



  closeChatModal() {
    this.chatModal.style.display = 'none';
  }

  addEvent() {
    const newEvent: EventInput = {
      title: this.newEvent.title,
      start: this.selectedDate,
      allDay: true
    };

    this.events.push(newEvent);
    this.closeModal();
    this.updateCalendarEvents(); // Atualiza os eventos no calendário após a adição
  }

  updateCalendarEvents() {
    const calendarApi = this.calendarEl.nativeElement.fullCalendar;
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(this.events);
  }
}
