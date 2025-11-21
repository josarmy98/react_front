import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuto, updateAuto, type Auto } from "@/api/autos";
import { ArrowLeft, Save } from "lucide-react";

export function AutoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    marca: "",
    modelo: "",
    anio: 0,
    patente: "",
  });

  useEffect(() => {
    const fetchAuto = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getAuto(id);
        setAuto(data);
        setError("");
      } catch (err) {
        setError("Error al cargar el auto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuto();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await updateAuto(id, {
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente,
      });
      setSuccess("Auto actualizado correctamente");
    } catch (err) {
      setError("Error al actualizar el auto");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/autos")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Editar Auto
          </h1>
          <p className="text-muted-foreground">
            Modifica la información del vehículo
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400">
          {success}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Información del Auto</CardTitle>
          <CardDescription>
            Completa los datos del vehículo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="marca" className="text-sm font-medium">
                  Marca
                </label>
                <Input
                  id="marca"
                  value={auto.marca}
                  onChange={(e) =>
                    setAuto({ ...auto, marca: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="modelo" className="text-sm font-medium">
                  Modelo
                </label>
                <Input
                  id="modelo"
                  value={auto.modelo}
                  onChange={(e) =>
                    setAuto({ ...auto, modelo: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="anio" className="text-sm font-medium">
                  Año
                </label>
                <Input
                  id="anio"
                  type="number"
                  value={auto.anio}
                  onChange={(e) =>
                    setAuto({ ...auto, anio: parseInt(e.target.value) || 0 })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="patente" className="text-sm font-medium">
                  Patente
                </label>
                <Input
                  id="patente"
                  value={auto.patente}
                  onChange={(e) =>
                    setAuto({ ...auto, patente: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/autos")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

