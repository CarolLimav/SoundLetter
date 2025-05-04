import { Component, OnInit } from '@angular/core';
import { 
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-introducao',
  templateUrl: './introducao.component.html',
  styleUrls: ['./introducao.component.css'],
  animations: [
    trigger('textReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.8s cubic-bezier(0.215, 0.61, 0.355, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: 0 } })
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s ease', 
          style({ opacity: 1 }))
      ], { params: { delay: 0 } })
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.8s ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('0.8s ease', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { delay: 0 } })
    ]),
    trigger('cardFloat', [
      transition(':enter', [
        style({ transform: 'perspective(1000px) rotateY(20deg) translateY(0)' }),
        animate('8s ease-in-out infinite alternate', 
          keyframes([
            style({ transform: 'perspective(1000px) rotateY(20deg) translateY(0)', offset: 0 }),
            style({ transform: 'perspective(1000px) rotateY(20deg) translateY(-20px)', offset: 0.5 }),
            style({ transform: 'perspective(1000px) rotateY(20deg) translateY(0)', offset: 1 })
          ]))
      ])
    ])
  ]
})
export class IntroducaoComponent  implements OnInit {
  stats = [
    { count: 5000, label: 'Músicas enviadas' },
    { count: 98, label: 'Satisfação' }
  ];

  notes = [
    { left: '10%', top: '20%', delay: '0s' },
    { left: '80%', top: '60%', delay: '3s' },
    { left: '70%', top: '30%', delay: '6s' },
    { left: '20%', top: '80%', delay: '9s' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.animateStats();
  }

  animateStats() {
    this.stats.forEach((stat, index) => {
      const target = stat.count;
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        stat.count = Math.floor(progress * target);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      
      setTimeout(animate, 1200 + (index * 200));
    });
  }

  pulse(event: MouseEvent) {
    const button = event.target as HTMLElement;
    const pulse = document.createElement('span');
    pulse.className = 'pulse-effect';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    pulse.style.width = pulse.style.height = `${size}px`;
    pulse.style.left = `${x}px`;
    pulse.style.top = `${y}px`;
    
    button.appendChild(pulse);
    
    setTimeout(() => {
      pulse.remove();
    }, 1000);
  }
}
