import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { deleteSimulation } from "@/services/simulationService";
import { SimulationListItem } from "./types";

interface ListProps {
  simulations: SimulationListItem[];
  onDelete: () => void;
}

export default function List({ simulations, onDelete }: ListProps) {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      await deleteSimulation(id);
      onDelete();
    } catch (err) {
      console.error("Failed to delete simulation:", err);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/detail/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200 mt-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Minhas Simulações
      </h2>

      {simulations.length === 0 ? (
        <p className="text-slate-500 text-center py-8">
          Nenhuma simulação criada ainda. Crie sua primeira simulação acima!
        </p>
      ) : (
        <div className="space-y-4">
          {simulations.map((simulation) => (
            <div
              key={simulation._id}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            >
              <div className="flex-1">
                <h3 className="font-medium text-slate-800">
                  {simulation.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Criado em: {formatDate(simulation.createdAt)}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => handleViewDetails(simulation._id)}>
                  Ver Detalhes
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(simulation._id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
