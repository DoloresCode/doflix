import { Component, Input } from '@angular/core';
import { imagesBaseUrl } from '../../constants/images-sizes'; // Corrected import
import { Movie } from '../../types/movie';



@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss'
})
export class ShowItemComponent {

  @Input() showItem : Movie | null = null;
  imageBaseUrl = imagesBaseUrl; // Use the imported constant



}



