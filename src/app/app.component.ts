import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgClass, NgStyle } from '@angular/common';

type Vou = {
  id: number,
  label: string,
  pesos: Record<PesoKey, number>,
  children?: Vou[]
}

const pesos = {
  CPU_SINGLE: 1,
  CPU_MULTI: 1,
  CPU_L1: 1,
  CPU_L2: 1,
  CPU_L3: 1,
  CPU_TDP: 10
};
type PesoKey = keyof typeof pesos;

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spec-picker';
  mainForm: FormGroup;
  tuneAreaHidden = false;

  tunePesos = [
    { key: 'CPU_SINGLE', label: 'CPU Single Core', value: pesos.CPU_SINGLE },
    { key: 'CPU_MULTI', label: 'CPU Multi Core', value: pesos.CPU_MULTI },
    { key: 'CPU_L1', label: 'CPU Cache L1', value: pesos.CPU_L1 },
    { key: 'CPU_L2', label: 'CPU Cache L2', value: pesos.CPU_L2 },
    { key: 'CPU_L3', label: 'CPU Cache L3', value: pesos.CPU_L3 },
    { key: 'CPU_TDP', label: 'Eficiência', value: pesos.CPU_TDP },
  ]

  vous = [
    {
      id: 1,
      label: 'Jogar',
      pesos: { CPU_SINGLE: 2, CPU_L1: 1, CPU_TDP: -1 }, // Games benefit from fast cache for responsiveness
      children: [
        { id: 11, label: 'Jogos Competitivos', pesos: { CPU_SINGLE: 3, CPU_MULTI: 0, CPU_L1: 2 } }, // Favor quick responsiveness
        { id: 12, label: 'Jogos de Estratégia', pesos: { CPU_SINGLE: -1, CPU_MULTI: 3, CPU_L2: 2 } }, // Strategic games use multi-core and larger cache
        { id: 13, label: 'Jogos de Última Geração', pesos: { CPU_SINGLE: 2, CPU_MULTI: 1, CPU_L3: 3 } }, // AAA games need robust L3 cache
        { id: 14, label: 'Jogos Casuais', pesos: { CPU_SINGLE: -1, CPU_MULTI: 0, CPU_L1: 1 } }, // Light demands, minor cache use
      ],
    },
    {
      id: 2,
      label: 'Trabalhar',
      pesos: { CPU_SINGLE: 1, CPU_MULTI: 1, CPU_L1: 1, CPU_L2: 1, CPU_L3: 1, CPU_TDP: 1 }, // Balanced cache use for work
      children: [
        { id: 21, label: 'Edição de Fotos', pesos: { CPU_SINGLE: 2, CPU_MULTI: -1, CPU_L1: 2 } }, // Single-core tasks with fast cache
        { id: 22, label: 'Edição de Vídeos', pesos: { CPU_SINGLE: -1, CPU_MULTI: 3, CPU_L3: 3 } }, // Multi-core heavy with L3 cache for large data
        { id: 23, label: 'Programação', pesos: { CPU_SINGLE: 2, CPU_MULTI: 2, CPU_L1: 1 } }, // Balanced with slight cache emphasis
        { id: 24, label: 'Streaming', pesos: { CPU_SINGLE: 1, CPU_MULTI: 3, CPU_L3: 2, CPU_TDP: -2 } }, // Multi-core and L3 for encoding
        { id: 25, label: 'Design Gráfico', pesos: { CPU_SINGLE: 3, CPU_MULTI: 1, CPU_L2: 2 } }, // Quick rendering with larger L2 cache
        { id: 26, label: 'Desenvolvimento de Jogos', pesos: { CPU_SINGLE: 2, CPU_MULTI: 3, CPU_L3: 2 } }, // Balanced cores and larger L3 cache
        { id: 27, label: 'CAD e Modelagem 3D', pesos: { CPU_SINGLE: 3, CPU_MULTI: 2, CPU_L2: 3 } }, // CAD benefits from quick cache
      ],
    },
    {
      id: 3,
      label: 'Estudar',
      pesos: { CPU_SINGLE: 2, CPU_MULTI: 2, CPU_L1: 1, CPU_TDP: 2 }, // L1 cache helps for general educational purposes
      children: [
        { id: 31, label: 'Programação', pesos: { CPU_SINGLE: 2, CPU_MULTI: 1, CPU_L1: 1 } }, // Balanced single-core with small cache needs
        { id: 32, label: 'Edição de Textos', pesos: { CPU_SINGLE: 1, CPU_MULTI: -1, CPU_L1: 1 } }, // Light workloads with minimal cache use
        { id: 33, label: 'Pesquisa', pesos: { CPU_SINGLE: 1, CPU_MULTI: 2, CPU_L2: 2 } }, // Multi-core focus with moderate L2 cache
      ],
    },
  ];
  userEdits: { key: string; value: number }[] = [];

  sers = [
    {
      id: 1,
      label: 'Móvel',
      pesos: { CPU_TDP: 1 },
      children: [
        {
          id: 11,
          label: 'Longa bateria',
          pesos: { CPU_SINGLE: -1, CPU_MULTI: -1, CPU_TDP: 2 },
        },
        {
          id: 12,
          label: 'Gamer',
          pesos: { CPU_SINGLE: 1, CPU_MULTI: 1, CPU_TDP: -2 },
        },
        {
          id: 13,
          label: 'Profissional',
          pesos: { CPU_SINGLE: 1, CPU_MULTI: 1, CPU_TDP: 1 },
        }
      ]
    },
    {
      id: 2,
      label: 'Desktop',
      pesos: { CPU_TDP: -1 },
      children: [
        {
          id: 21,
          label: 'Econômico',
          pesos: { CPU_SINGLE: -1, CPU_MULTI: -1, CPU_TDP: 2 },
        },
        {
          id: 22,
          label: 'Gamer',
          pesos: { CPU_SINGLE: 1, CPU_MULTI: 1, CPU_TDP: -2 },
        },
        {
          id: 23,
          label: 'Profissional',
          pesos: { CPU_SINGLE: 1, CPU_MULTI: 2, CPU_TDP: 1 },
        }
      ]
    }
  ];
  recomendacoes: {
    base: boolean;
    frequencia: number; // GHz
    nucleos: number; cacheL1: number; // KB
    cacheL2: number; // KB
    cacheL3: number; // KB
    consumoEnergia: number; // Watts
    custo: number; // Base cost in arbitrary units
  } = {
      frequencia: 0, nucleos: 0, cacheL1: 0, cacheL2: 0, cacheL3: 0, consumoEnergia: 0, custo: 0, base: true
    };

  constructor(
    private matIconReg: MatIconRegistry,
    private fb: FormBuilder
  ) {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');

    this.mainForm = this.fb.group({
      orcamentoMin: [1000],
      orcamentoMax: [2000],
      vous: [[]],
      sers: [[]]
    });
    this.mainForm.valueChanges.subscribe({
      next: (value) => {
        this.removeUnselectedChildrenVous();
        this.removeUnselectedChildrenSers();
      }
    });
  }
  removeUnselectedChildrenVous() {
    const vousControl = this.mainForm.controls['vous'];
    const currentSelected = vousControl.value;
    const nSelected = currentSelected.length;
    this.vous.forEach((vou: any) => {
      if (!this.isVouSelected(vou)) {
        vou.children?.forEach((child: Vou) => {
          const toBeRemoved = currentSelected.findIndex((vouS: Vou) => vouS.id == child.id);
          if (toBeRemoved >= 0) {
            currentSelected.splice(toBeRemoved, 1);
          }
        })
      }
    });
    if (nSelected != currentSelected.length)
      vousControl.setValue(currentSelected);
  }

  removeUnselectedChildrenSers() {
    const sersControl = this.mainForm.controls['sers'];
    const currentSelected = sersControl.value;
    const nSelected = currentSelected.length;
    this.sers.forEach((ser: any) => {
      if (!this.isSerSelected(ser)) {
        ser.children?.forEach((child: Vou) => {
          const toBeRemoved = currentSelected.findIndex((serS: Vou) => serS.id == child.id);
          if (toBeRemoved >= 0) {
            currentSelected.splice(toBeRemoved, 1);
          }
        })
      }
    });
    if (nSelected != currentSelected.length)
      sersControl.setValue(currentSelected);
  }

  getSelectedVou(id: number) {
    return this.mainForm.value.vous.find((vou: Vou) => vou.id == id);
  }
  getSelectedSer(id: number) {
    return this.mainForm.value.sers.find((vou: Vou) => vou.id == id);
  }
  isVouSelected(vou: Vou) {
    return this.mainForm.value.vous.some((vouC: Vou) => vouC.id == vou.id);
  }
  isSerSelected(ser: any) {
    return this.mainForm.value.sers.some((vouC: Vou) => vouC.id == ser.id);
  }
  getTransformedPesos() {
    // Retorna uma copia dos pesos com os valores transformados pelos valores selecionados
    const copy = JSON.parse(JSON.stringify(this.tunePesos));
    this.mainForm.value.vous.forEach((vou: Vou) => {
      Object.keys(vou.pesos).forEach((key: any) => {
        const peso = copy.find((peso: any) => peso.key == key) ?? { value: 0 };
        peso.value += vou.pesos[key as PesoKey];
        if (peso.value < 1) peso.value = 1;
        if (peso.value > 20) peso.value = 20;
      });
    });
    this.mainForm.value.sers.forEach((ser: Vou) => {
      Object.keys(ser.pesos).forEach((key: any) => {
        const peso = copy.find((peso: any) => peso.key == key) ?? { value: 0 };
        peso.value += ser.pesos[key as PesoKey];
        if (peso.value < 1) peso.value = 1;
        if (peso.value > 20) peso.value = 20;
      });
    });
    this.userEdits.forEach((edit) => {
      const peso = copy.find((peso: any) => peso.key == edit.key) ?? { value: 0 };
      peso.value += edit.value;
      if (peso.value < 1) peso.value = 1;
      if (peso.value > 20) peso.value = 20;
    });
    return copy;
  }
  getPesoPercentage(peso: any) {
    return String(peso.value / 20.0 * 100) + '%';
  }
  add2Peso(peso: any, sub = false) {
    this.userEdits.push({ key: peso.key, value: sub ? 1 : -1 });
  }

  getTunedPeso(key: PesoKey) {
    return this.getTransformedPesos().find((peso: any) => peso.key == key) ?? { value: 0 };
  }

  calcularEspecificacoes() {
    const pesos = this.getTransformedPesos();
    console.log(pesos);
    const orcamentoMin = (this.mainForm.value.orcamentoMin + this.mainForm.value.orcamentoMax) / 2;
    const orcamentoMax = (this.mainForm.value.orcamentoMin + this.mainForm.value.orcamentoMax) / 2;
    // Base specifications (hypothetical values)
    let baseSpecs = {
      frequencia: 2.5, // GHz
      nucleos: 4,
      cacheL1: 32, // KB
      cacheL2: 256, // KB
      cacheL3: 4096, // KB
      consumoEnergia: 80, // Watts
      custo: 500, // Base cost in arbitrary units
      base: false
    };
    // Scale down to fit within budget
    let budgetScale = 0
    if (baseSpecs.custo > orcamentoMax) {
      budgetScale = Math.round((orcamentoMax - baseSpecs.custo) / 200);
    } else {
      budgetScale = Math.round((orcamentoMin - baseSpecs.custo) / 200);
    }
    console.log(this.getTunedPeso('CPU_TDP').value);
    // Adjust specifications based on weights

    baseSpecs.frequencia += Math.round(Math.sqrt((this.getTunedPeso('CPU_SINGLE').value / (this.getTunedPeso('CPU_MULTI').value) * .8) + budgetScale) * .5 * 100) / 100; // Increase 0.2 GHz per weight
    baseSpecs.nucleos += Math.round(((this.getTunedPeso('CPU_MULTI').value / this.getTunedPeso('CPU_SINGLE').value) + budgetScale / 16) * 4); // Add 1 core per weight
    baseSpecs.cacheL1 += ((this.getTunedPeso('CPU_L1').value) + budgetScale) * 32; // Increase L1 cache by 64KB per weight
    baseSpecs.cacheL2 += ((this.getTunedPeso('CPU_L2').value) + budgetScale) * 256; // Increase L2 cache by 512KB per weight
    baseSpecs.cacheL3 += ((this.getTunedPeso('CPU_L2').value) + budgetScale) * 1024; // Increase L2 cache by 8MB per weight
    baseSpecs.consumoEnergia -= ((this.getTunedPeso('CPU_TDP').value - baseSpecs.nucleos / 10) - 10) * 10; // Increase power draw per weight

    this.recomendacoes = baseSpecs;
  }
  reiniciar() {
    this.mainForm.controls['orcamentoMin'].setValue(1000);
    this.mainForm.controls['orcamentoMax'].setValue(2000);
    this.mainForm.controls['vous'].setValue([]);
    this.mainForm.controls['sers'].setValue([]);
    this.userEdits = [];
  }
}
