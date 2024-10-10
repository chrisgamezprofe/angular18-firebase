import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectodemo';
  items$: Observable<any[]>;
  newItem = { dni: '', name: '', email: '' };
  
  constructor() {
    const firestore = inject(Firestore);
    const teacherCollection = collection(firestore, 'teachers');
    this.items$ = collectionData(teacherCollection);
    this.addExampleData(firestore);
  }

  async addExampleData(firestore: Firestore) {
    const teacherCollection = collection(firestore, 'teachers');
    const snapshot = await getDocs(teacherCollection);

    if (snapshot.empty) {
      const itemExample = {
        dni: '12345678',
        name: 'Juan Perez',
        email: 'juan.perez@example.com',
      }

      try {
        await addDoc(teacherCollection, itemExample);
        alert('Item agregado!!')
      } catch (error) {
        console.log('Error!!', error)
      }
    }
    
  }
}
