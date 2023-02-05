# Observáveis em Angular!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Sobre

Este repositório foi criado com o objetivo de fazer um código simples e de fácil entendimento para junto a documentação, ajudar mais pessoas entenderem o conceito de observáveis em Angular.

## O que são observáveis?
<p>Primeiro, é muito importante entender que sempre existe um observável (algo a ser observado) e um observador (o que observa algo). Sendo assim, um observável consiste em um objeto importado de um pacote de terceiros, o RXJS e pode ser pensado como uma fonte de dados, algo que irá observar o retorno, ou execução de uma tarefa assíncrona, ou a execucao de código/evento que pode acontecer após a interação do usuário, por exemplo, e com base nisso o observável executa algum código.</p>

<p>Tendo em vista, que sempre há um observável, observador e, entre eles, um fluxo de código, pode-se pensar que a função subscribe() é um observador. Veja no exemplo de código abaixo:</p>


```html
   <a [routerLink]="['user', 1]">
        User 1
    </a>
      |
    <a [routerLink]="['user', 2]">
        User 2
    </a>
```

```javascript
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
        this.id = +params.id;
        });
    }
```

<p>Neste exemplo, quando o usuário clica em um dos links ele passa para rota 'user' o id do usuário clicado, mas é a função subscribe() que fica observando a mudança desses id's, para que com base nisso, possa mostrá-los no componente 'app-user'.</p> 
<p>Portanto, os observáveis também podem ser pensados como construções, que assinamos/inscrevemos para sermos informados sobre mudanças que acontecem após a execução de algum código. Nesse caso, a mudança do parametro da rota após o clique do usuário.</p>

## Um outro exemplo

```javascript
    import { interval, Subscription} from 'rxjs';

    ngOnInit() {
        this.firstSubscription = interval(1000).subscribe(count => {
            console.log(count)
        })
    }
```

<p>Neste exemplo, foi importado um observável do pacote RXJS, que incrementa um valor a cada segundo, e o observador -> subscribe() observa isso e mostra no console. Mas tem algumas coisas que são mutio importantes sobre os observáveis e é preciso estar ciente:</p> 

<p>1 - Neste trecho de código por exemplo, o observável não deixa de emitir os intervalos após a rota/componente ser deixado, ou após o usuário navegar para outra rota da aplicação.</p>

<p>2 - Podem ter observáveis que irão emitir um valor uma única vez, como por exemplo, observáveis para requisicoes HTTTP.</p>

<p>3 - Quando for utilizado observáveis como o do exemplo acima, que ficam observando e emitindo dados após a execução de algum código ou a inicializacao de um componente, para que o observável pare e deixe de observar qualquer coisa após o componente/rota ser deixado, é necessário cancelar o método subscribe()/o que ele está retornando, e isso deve ser feito dentro do método ngOnDestroy, que é executado no momento/ciclo de vida da destruição do componente.</p>

```javascript
    ngOnDestroy(): void {
        this.firstSubscription.unsubscribe();
    }
```

<p>Dessa maneira, ao deixar a rota/componente, deixa de ser executado todo e qualquer dado observado e retornado pelo observável. No entando, note, que isso só é possível quando armazenada tudo o que é retornado pelo subscribe() em alguma propriedade no componente.</p>

```typescript
    private firstSubscription: Subscription;
```

<p>Talvez, você esteja se perguntando agora: "Porque no primeiro exemplo, não foi necessário cancelar o subscribe()?"</p>

<p> 1 - Aquele observável só retornava algo/informava ao componente alguma mudança após o usuário clicar em algum link.</p>

<p> 2 - Porque <strong>os observáveis Angular são gerenciados pelo Angular, portanto, isso inclui o cancelamento/unsubscribe() do observável, sem a necessidade de faze-lo manualmente.</strong><p>


## Observações sobre o subscribe()

<p> No exemplos acima, podemos ver que o método subscribe() está sendo chamado através de diferentes observáveis, sendo informado sobre algumas mudanças e, executando algum código com base nisso. Mas o subscribe() pode receber até 3 parametros, que podem ser entendidos como diferentes maneiras de lidar com o que é observado. Veja no exemplo abaixo: </p>

```javascript
    subscribe(
      valor => {
        // code
      },
      erro => {
        //code
      },
      conclusao => {
        // code
      });
```

<p> Sendo assim, o subscribe() pode executar diferentes códigos p/ cada fase do observável: retorno dados, erro nos dados ou a conclusão do observável.</p>

## Como criar um observável

<p> O Angular tem muitos observáveis e utiliza da função subscribe() como forma de observar as mudanças/retornos após algum fluxo de código ser executado. No entanto, também é possível, criar os seus próprios observáveis. Vamos fazer isso aqui para entendermos melhor observável e observador!</p>

<p> Primeiro é preciso importar o observável do pacote RXJS:</p>

```javascript
    import { interval, Subscription, Observable } from 'rxjs';
```
<p> Em segundo, é necessário instanciar este objeto e definir o tipo do observável:<p>

```typescript
   const customObservable = new Observable<number>()
```
<p>Em terceiro, é necessário definir o que vai ser informado ao seu observador a partir do observável. Isso é feito através de uma arrow function, inserida no parametro do observável, a qual recebe como parametro um observador:</p>


```javascript
    const customObservable = new Observable<number>((observator) => { <------- arrow function que recebe o observador
      let count = 0;
      setInterval(() => {
        observator.next(count); <------ método do observador
        count++;

        if(count === 3) {
          observator.complete() <------ método do observador
        }

        if (count > 7) {
          observator.error(new Error("Maior que 7!")) <------ método do observador
        }
      }, 1000);
    });
```

<p> Perceba que através dos métodos do observador, conseguimos informar quando o nosso observável está lidando com novos dados, quando ele pode ser completado e quando ele deve apresentar algum erro.</p>

<p> No exemplo acima, nosso observável está lidando com os números que são contados a cada intervalo. Quando o contador chega em 3, o observável é concluído e informa isso ao observador, se ele passar de 7, o que nesse caso não tem como acontecer, mas só a nível de exemplo mesmo, ele informaria um erro ao observador</p>

