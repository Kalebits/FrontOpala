import { IAnuncio } from 'app/model/IAnuncio.model';
import { ArtistaResponse } from './artista.response.model';
import { ContratantesResponse } from './contratantes.response.model';
export interface anuncioResponde{
  artistas: ArtistaResponse[];
  contratantes: ContratantesResponse[];
}
