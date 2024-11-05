import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form : NgForm){
      if(form.valid){
        this.router.navigate(['./sucesso'])
      } else {
        alert('Formulário invalido')
      }
  }

  consultaCep(e: any, f: NgForm){
    const url = e.target.value;
    if(url !== ''){
      this.service.consultarCep(url).subscribe(res => {
        console.log(res)
        this.preencherCampos(res, f)
      })
    }
  }

  preencherCampos(dados: any, f: NgForm){
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    })
  }
}
