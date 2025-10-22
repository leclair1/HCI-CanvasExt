import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Sparkles, 
  FileText,
  Video,
  BookOpen,
  Loader2,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { mockCourseContent, mockCourseMaterials } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

interface FlashcardCreatorProps {
  courseId: string | null;
  onBack: () => void;
  onViewFlashcards: () => void;
}

export default function FlashcardCreator({ courseId, onBack, onViewFlashcards }: FlashcardCreatorProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [generatedCards, setGeneratedCards] = useState<Array<{ term: string; definition: string; selected: boolean }>>([]);
  const [step, setStep] = useState<'select' | 'analyzing' | 'review'>('select');

  const allMaterials = mockCourseMaterials.modules.flatMap(module => 
    module.items.map(item => ({
      id: `${module.id}-${item.title}`,
      title: item.title,
      type: item.type,
      module: module.title,
      content: item.content || '',
    }))
  );

  const toggleMaterial = (id: string) => {
    setSelectedMaterials(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    if (selectedMaterials.length === 0) {
      toast.error('Please select at least one material to analyze');
      return;
    }

    setIsAnalyzing(true);
    setStep('analyzing');
    setAnalysisProgress(0);

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Generate flashcards from vocabulary
          const resolvedCourseId = (courseId && courseId in mockCourseContent ? courseId : 'crn4020') as keyof typeof mockCourseContent;
          const activeCourseId = resolvedCourseId;
          const vocabulary = mockCourseContent[activeCourseId]?.vocabulary ?? [];
          const cards = vocabulary.map(v => ({
            term: v.term,
            definition: v.definition,
            selected: true,
          }));
          setGeneratedCards(cards);
          setIsAnalyzing(false);
          setStep('review');
          toast.success('Flashcards generated!', {
            description: `Found ${cards.length} key terms and concepts from your materials.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const toggleCard = (index: number) => {
    setGeneratedCards(prev => 
      prev.map((card, i) => i === index ? { ...card, selected: !card.selected } : card)
    );
  };

  const handleCreateFlashcards = () => {
    const selectedCount = generatedCards.filter(c => c.selected).length;
    toast.success('Flashcards created!', {
      description: `Created ${selectedCount} flashcards. Opening study interface...`,
    });
    setTimeout(() => {
      onViewFlashcards();
    }, 1000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'reading': return BookOpen;
      case 'file': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-foreground">AI Flashcard Generator</h1>
            <p className="text-sm text-muted-foreground">Select course materials to analyze and generate flashcards</p>
          </div>
        </div>
      </div>

      {/* Select Materials Step */}
      {step === 'select' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-foreground mb-1">Select Course Materials</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedMaterials.length} item{selectedMaterials.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <Button onClick={handleAnalyze} disabled={selectedMaterials.length === 0}>
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze & Generate
              </Button>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="bg-muted">
                <TabsTrigger value="all">All Materials</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="readings">Readings</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-2">
                {allMaterials.map((material) => {
                  const Icon = getIcon(material.type);
                  const isSelected = selectedMaterials.includes(material.id);
                  
                  return (
                    <div
                      key={material.id}
                      onClick={() => toggleMaterial(material.id)}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Checkbox checked={isSelected} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <h4 className="text-foreground">{material.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{material.module}</p>
                        {material.content && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{material.content}</p>
                        )}
                      </div>
                      <Badge variant="outline">{material.type}</Badge>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="videos" className="space-y-2">
                {allMaterials.filter(m => m.type === 'video').map((material) => {
                  const Icon = getIcon(material.type);
                  const isSelected = selectedMaterials.includes(material.id);
                  
                  return (
                    <div
                      key={material.id}
                      onClick={() => toggleMaterial(material.id)}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Checkbox checked={isSelected} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-foreground">{material.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{material.module}</p>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="readings" className="space-y-2">
                {allMaterials.filter(m => m.type === 'reading').map((material) => {
                  const Icon = getIcon(material.type);
                  const isSelected = selectedMaterials.includes(material.id);
                  
                  return (
                    <div
                      key={material.id}
                      onClick={() => toggleMaterial(material.id)}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Checkbox checked={isSelected} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-foreground">{material.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{material.module}</p>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="files" className="space-y-2">
                {allMaterials.filter(m => m.type === 'file').map((material) => {
                  const Icon = getIcon(material.type);
                  const isSelected = selectedMaterials.includes(material.id);
                  
                  return (
                    <div
                      key={material.id}
                      onClick={() => toggleMaterial(material.id)}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Checkbox checked={isSelected} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-foreground">{material.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{material.module}</p>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}

      {/* Analyzing Step */}
      {step === 'analyzing' && (
        <Card className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <h3 className="text-foreground mb-2">Analyzing Course Materials</h3>
            <p className="text-sm text-muted-foreground mb-6">
              AI is extracting key terms, concepts, and vocabulary from {selectedMaterials.length} materials
            </p>
            <div className="max-w-md mx-auto space-y-2">
              <Progress value={analysisProgress} className="h-3" />
              <p className="text-sm text-muted-foreground">{analysisProgress}% complete</p>
            </div>
          </div>
        </Card>
      )}

      {/* Review Step */}
      {step === 'review' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-foreground mb-1">Review Generated Flashcards</h3>
                <p className="text-sm text-muted-foreground">
                  {generatedCards.filter(c => c.selected).length} of {generatedCards.length} cards selected
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('select')}>
                  Start Over
                </Button>
                <Button onClick={handleCreateFlashcards} disabled={generatedCards.filter(c => c.selected).length === 0}>
                  <Check className="h-4 w-4 mr-2" />
                  Create Flashcards
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {generatedCards.map((card, index) => (
                <div
                  key={index}
                  onClick={() => toggleCard(index)}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    card.selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Checkbox checked={card.selected} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-foreground mb-2">{card.term}</h4>
                    <p className="text-sm text-muted-foreground">{card.definition}</p>
                  </div>
                  <Badge variant={card.selected ? 'default' : 'outline'}>
                    {card.selected ? 'Selected' : 'Skip'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
