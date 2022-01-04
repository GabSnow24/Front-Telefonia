import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Input } from "@material-ui/core";
import { NextPage } from "next";
import Head from "next/head";
import TaxServices from "../services/TaxServices";
import PlanServices from "../services/PlanServices";

const Calculado: NextPage = () => {
  const [taxes, setTaxes] = useState([]);
  const [taxe, setTaxe] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(null);
  const [time, setTime] = useState(null);
  const [withplan, setWithPlan] = useState(null);
  const [withoutplan, setWithoutPlan] = useState(null);
  useEffect(() => {
    async function getData() {
      const tax_services = new TaxServices();
      const tax: any = await tax_services.readAll();
      setTaxes(tax);

      const plan_services = new PlanServices();
      const plan: any = await plan_services.readAll();
      setPlans(plan);
    }
    getData();
  }, []);

  const handleTaxe = (event: any) => {
    setTaxe(event.target.value);
  };
  const handlePlan = (event: any) => {
    setPlan(event.target.value);
  };
  const handleTime = (event: any) => {
    setTime(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if(taxe === null || plan === null || time === null  ){
      return alert('Informações sobre o cálculo faltando')
    }
    setWithoutPlan(taxe.value * time);
    const sub = time - plan.time;
    if (sub < 0) {
      return setWithPlan(0);
    }
    setWithPlan(sub * taxe.value * 1.1);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Calculadora de Custos</title>
        <link rel="icon" href="/gqlogo.png" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <p className="mt-3 lg:text-2xl text-xl text-center">
          Aqui na Telzir você fala mais, por menos. Vem ser Telzir!
        </p>
        <div className="mb-5">
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <FormControl fullWidth>
              <InputLabel id="origem-destino">Origem/Destino</InputLabel>
              <Select
                labelId="origem-destino-label"
                id="origem-destino-select-id"
                required
                value={taxe}
                label="Origem/Destino"
                onChange={handleTaxe}
              >
                {taxes.map((obj) => (
                  <MenuItem value={obj}>
                    {obj.origin} -{">"} {obj.destiny}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6  sm:w-full">
            <FormControl fullWidth>
              <InputLabel id="plano">Plano</InputLabel>
              <Select
                labelId="plano-label"
                id="plano-select-id"
                required
                value={plan}
                label="Plano"
                onChange={handlePlan}
              >
                {plans.map((obj) => (
                  <MenuItem value={obj}>{obj.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6  sm:w-full">
            <FormControl fullWidth>
              <InputLabel id="tempo">Minutos</InputLabel>
              <Input
                id="tempo-input-id"
                value={time}
                type="number"
                required
                onChange={handleTime}
              />
            </FormControl>
          </div>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSubmit}
              href="/telzir/resultado"
            >
              Calcular
            </Button>
          </div>
        </div>
        <h1 className="lg:text-6xl text-3xl  font-bold">O resultado é:</h1>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="flex gap-x-2">
            <Button variant="contained" size="large" color="error">
              Sem FaleMais R$ {withoutplan}
            </Button>
            <Button variant="contained" size="large">
              Com FaleMais R$ {withplan}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Button variant="text" size="small" href='/' >
              Voltar
          </Button>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/GabSnow24"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/gqlogo.png" alt="Gabriel Queiroz" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
};

export default Calculado;
