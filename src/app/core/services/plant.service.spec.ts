import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule, HttpTestingController,
} from '@angular/common/http/testing';

import { PlantService } from './plant.service';
import { FullPlant, Plant } from '../interfaces/plant.interface';

const MOCK_ARRAY = [
  {
    "address": "119 Webb View Apt. 563",
    "country": "VC",
    "division": "Aerospace",
    "id": 1,
    "name": "Wallace-Patton"
  },
  {
    "address": "3563 Brenda Burgs",
    "country": "KI",
    "division": "Tires",
    "id": 2,
    "name": "Espinoza Group"
  },
  {
    "address": "462 Lloyd Burgs Suite 445",
    "country": "BA",
    "division": "Tires",
    "id": 3,
    "name": "Hernandez-Johnson"
  },
  {
    "address": "103 Sara Junction",
    "country": "LU",
    "division": "Pet food",
    "id": 4,
    "name": "Carpenter, Peterson and Foley"
  },
  {
    "address": "060 Donna Walks",
    "country": "GN",
    "division": "Automotive",
    "id": 5,
    "name": "Thornton and Sons"
  },
  {
    "address": "750 Jordan Orchard Suite 067",
    "country": "LV",
    "division": "Aerospace",
    "id": 6,
    "name": "Gaines, Oconnor and Cross"
  },
  {
    "address": "13257 Dana Drive Apt. 635",
    "country": "AM",
    "division": "Tires",
    "id": 7,
    "name": "Jacobs, Ross and Guerra"
  },
  {
    "address": "04275 Devin Rapid",
    "country": "CN",
    "division": "Pet food",
    "id": 8,
    "name": "Jones Group"
  },
  {
    "address": "631 Weber Vista Suite 523",
    "country": "CR",
    "division": "Aerospace",
    "id": 9,
    "name": "Hamilton LLC"
  },
  {
    "address": "6834 Wilson Ranch",
    "country": "MZ",
    "division": "Pet food",
    "id": 10,
    "name": "Henry PLC"
  }
]

const MOCK_FULL_PLANT: FullPlant = {
  "address": "119 Webb View Apt. 563",
  "city": "North Davidfurt",
  "country": "VC",
  "default_language": "ckb",
  "description": "Eligendi quod eaque facere.\nOdit fugit dolor cum eum aut. Debitis est molestiae aperiam dolor. Voluptates similique accusantium corrupti eum.",
  "division": "Aerospace",
  "id": 1,
  "manager": "Jorge Bowen",
  "name": "Wallace-Patton",
  "phone": "756.577.0352"
}

describe('PlantService', () => {
  let service: PlantService;
  let httpController: HttpTestingController;
  let url = 'https://sg666zbdmf.execute-api.us-east-1.amazonaws.com/dev';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PlantService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPlants and return an array of Plants', () => {
    service.getPlants(0).subscribe((res) => {
      console.log("🚀 ~ service.getPlants ~ res:", res.count)
      expect(res as unknown as Plant[]).toEqual(MOCK_ARRAY);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}?offset=0`,
    });
    req.flush(MOCK_ARRAY);
  });

  it('should call getPlant and return one Plant', () => {
    service.getPlant(1).subscribe((res) => {
      expect(res as unknown as FullPlant).toEqual(MOCK_FULL_PLANT);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/1`,
    });
    req.flush(MOCK_FULL_PLANT);
  });
});
