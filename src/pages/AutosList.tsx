import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAutos, deleteAuto, type Auto } from "@/api/autos";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createAuto } from "@/api/autos";

export function AutosList() {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
    marca: "",
    modelo: "",
    anio: "",
    patente: "",
  });

  const fetchAutos = async () => {
    try {
      setLoading(true);
      const data = await getAutos();
      setAutos(data);
      setError("");
    } catch (err) {
      setError("Error al cargar los autos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este auto?")) {
      try {
        await deleteAuto(id);
        fetchAutos();
      } catch (err) {
        setError("Error al eliminar el auto");
        console.error(err);
      }
    }
  };

  const handleCreate = async () => {
    try {
      await createAuto({
        marca: newAuto.marca,
        modelo: newAuto.modelo,
        anio: parseInt(newAuto.anio),
        patente: newAuto.patente,
      });
      setOpenDialog(false);
      setNewAuto({ marca: "", modelo: "", anio: "", patente: "" });
      fetchAutos();
    } catch (err) {
      setError("Error al crear el auto");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Autos</h1>
          <p className="text-muted-foreground">
            Gestiona el inventario de vehículos
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Auto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Auto</DialogTitle>
              <DialogDescription>
                Completa los datos del nuevo vehículo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="marca">Marca</label>
                <Input
                  id="marca"
                  value={newAuto.marca}
                  onChange={(e) =>
                    setNewAuto({ ...newAuto, marca: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="modelo">Modelo</label>
                <Input
                  id="modelo"
                  value={newAuto.modelo}
                  onChange={(e) =>
                    setNewAuto({ ...newAuto, modelo: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="anio">Año</label>
                <Input
                  id="anio"
                  type="number"
                  value={newAuto.anio}
                  onChange={(e) =>
                    setNewAuto({ ...newAuto, anio: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="patente">Patente</label>
                <Input
                  id="patente"
                  value={newAuto.patente}
                  onChange={(e) =>
                    setNewAuto({ ...newAuto, patente: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {autos.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                No hay autos registrados
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Marca</th>
                  <th className="p-4 text-left">Modelo</th>
                  <th className="p-4 text-left">Año</th>
                  <th className="p-4 text-left">Patente</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {autos.map((auto) => (
                  <tr key={auto.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">{auto.marca}</td>
                    <td className="p-4">{auto.modelo}</td>
                    <td className="p-4">{auto.anio}</td>
                    <td className="p-4">{auto.patente}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link to={`/autos/${auto.id}`}>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(auto.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

