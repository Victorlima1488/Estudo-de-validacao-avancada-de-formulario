import { useState } from "react";
import { ButtonStyle, ButtonTech, ContainerTech, DivForms, MainStyle, SpanStyle } from "./AppStyled";
import { GlobalStyled } from "./global";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm, useFieldArray} from 'react-hook-form'
import { supabase } from "./lib/supabase";

// O Schema é a estrutura que define as regras de validação do formulário.
 const createUserFormSchema = z.object({
    avatar: z.instanceof(FileList).transform(list => list.item(0)!),
    name:
      z.string() // Dentro da biblioteza zode importamos o 'z' e temos acesso à todas as propriedades. Nessa linha, estamos definindo que o campo name receberá uma string.
      .nonempty('O nome é obrigatório') // A função nonempty torna obrigatório o preenchimento do campo.
      .transform(name => { // o trasform recebe o campo em questão como parâmetro, no caso o 'name', e transforma (altera) ele de acordo com a função que o usuário decidir.
      return name.trim().split(' ').map(word => { // Nesse caso, ele está eliminando os espaços do ínicio e do fim da string com a função trim(), depois separando as palavras onde tem espaço entre elas.
        return word[0].toLocaleUpperCase().concat(word.substring(1)) // Em seguida está pegando cada palavra com o map, pegando a primeira letra da palavra e deixando ela maiúscula.
      }).join(' ')
    }),
    email:
      z.string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato de e-mail inválido')
      .toLowerCase()
      .refine(email => email.endsWith("@gmail.com"), "o e-mail precisa ser gmail."),
    password:
      z.string()
      .min(6, 'A senha precisa de no mínimo 6 caracteres'),
    confirmPassword:
      z.string()
      .min(6, 'A senha precisa de no mínimo 6 caracteres'),
    techs: z.array(z.object({
      title: z.string().nonempty('O título é obrigatório'),
      knowledge: z.coerce.number().min(1).max(100),
    })).min(2, 'Insira no mínimo duas tecnologias')
 })

 type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function App() {

  const [outPut, setOutPut] = useState('') // Criando um estado para a atualização das informações na tela.

  // O hook useForm é um dos principais hooks do react-hook-form, ele é responsável por criar e controlar o estado do formulário, bem como registrar capos, validar dados e lidar com a submissão.
  // Desse hook foi desestruturado algumas funções, são elas a register, que é usado para registrar os campos, a handlesubmit é usada para tratar a submissão de um formulário de maneira assícrona
  // validando os dados antes de executar a função de submissão. O controle é usado para interagir com o registro de componentes persolanlizados não controlados do formulário.
  const {register, handleSubmit, control, formState: { errors }} = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema) // Faz a conxão do zod com o shema do react-hook-forms
  })

  const {fields, append} = useFieldArray({ // fileds são os campos, append é para add uma nova tecnologia, e remove é para remover uma tecnologia
    control, // É a forma de assicar o useFieldArray com o useForm
    name: 'techs', // Nome do campo
  })

   async function createUser(data:CreateUserFormData){ // declaração de uma função assíncrona, pois ela está pausando o processo da função em si para executar a supabase.
    supabase.storage.from('forms react').upload(data.avatar.name, data.avatar)

    setOutPut(JSON.stringify(data, null, 2))
  }

  function addNewTech(){
    append({title: '', knowledge: 0})
  }
 
  return (
    <>
      <MainStyle>
        <form action="" onSubmit={handleSubmit(createUser)}>
            <div>
              <label htmlFor="avatar">Avatar: </label>
              <input type="file" accept="image/*" {...register('avatar')}/>
              {errors.avatar && <SpanStyle>{errors.avatar.message}</SpanStyle>}
            </div>

            <DivForms>
              <label htmlFor="name">Nome</label>
              <input type="name" {...register('name')}/>
              {errors.name && <SpanStyle>{errors.name.message}</SpanStyle>}
            </DivForms>

            <DivForms>
              <label htmlFor="email">E-mail</label>
              <input type="email" {...register('email')}/>
              {errors.email && <SpanStyle>{errors.email.message}</SpanStyle>}
            </DivForms>
            
            <DivForms>
              <label htmlFor="password">Senha</label>
              <input type="password" {...register('password')}/>
              {errors.password && <SpanStyle>{errors.password.message}</SpanStyle>}
            </DivForms>

            <DivForms>
              <label htmlFor="confirmPassword">Confirme a senha</label>
              <input type="password" {...register('confirmPassword')}/>
              {errors.confirmPassword && <SpanStyle>{errors.confirmPassword.message}</SpanStyle>}
            </DivForms>

            <div>
              <label htmlFor="">
              Tecnologias
              <ButtonTech onClick={addNewTech}>Adicionar</ButtonTech>
              </label>

              {fields.map((field, index) => {
                return(
                    <ContainerTech key={field.id} >
                      <div>
                        <input type="text" {...register(`techs.${index}.title`)}/> 
                        <input type="number" {...register(`techs.${index}.knowledge`)}/>
                      </div>
                      {errors.techs?.[index]?.title && <SpanStyle>{errors.techs?.[index]?.title?.message}</SpanStyle>}
                    </ContainerTech>
                )
              })}
              {errors.techs && <SpanStyle>{errors.techs.message}</SpanStyle>}
            </div>

            <ButtonStyle type="submit">Salvar</ButtonStyle>
        </form>

        <pre>{outPut}</pre>
      </MainStyle>
      <GlobalStyled />
    </>
  )
}
