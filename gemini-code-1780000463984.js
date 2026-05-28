import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  Building2,
  Users2,
  Calendar,
  Plus,
  Minus,
  Menu,
  X,
  Star,
  Wallet,
  Trash2,
  Info,
  Truck,
  Package,
  Clock,
  ShieldCheck,
  CreditCard,
  Key,
  Video
} from 'lucide-react';

const baseCollections = [
  {
    id: 1,
    segment: 'Educação Infantil',
    title: 'Maternal (1 a 3 Anos)',
    price: 815.52,
    imageUrl: 'https://imagensplanoae.my.canva.site/_assets/media/0d280fe193f792a9c6710a51f3dbc491.png', 
    composition: ['4 Blocos de Atividades (Formato A3)', '4 Pastas (Formato A3)', '1 Maleta'],
    catalogUrl: 'https://imagensplanoae.my.canva.site/materiaisalicerces2027',
    optionals: [
      { id: 'ap3', title: 'Aprender a Palavra 3 anos', price: 88.25, max: 1 },
      { id: 'fa_mat', title: 'Coleção Fazendo Arte', price: 49.03, max: 2 },
      { id: 'am_mat', title: 'Coleção Aprendendo Música', price: 49.03, max: 2 }
    ]
  },
  {
    id: 2,
    segment: 'Educação Infantil',
    title: 'Pré-Escola (4 a 5 Anos)',
    price: 815.52,
    imageUrl: 'https://imagensplanoae.my.canva.site/_assets/media/9787f80c7047562ee6e1b9433524568e.png', 
    composition: ['4 Blocos Integrados (A4)', 'Opção Fichário ou Encadernado', '4 Pastas (A4)', '1 Maleta'],
    catalogUrl: 'https://imagensplanoae.my.canva.site/materiaisalicerces2027',
    optionals: [
      { id: 'ap4', title: 'Aprender a Palavra 4 anos', price: 65.37, max: 1 },
      { id: 'ap5', title: 'Aprender a Palavra 5 anos', price: 65.37, max: 1 },
      { id: 'fa_pre', title: 'Coleção Fazendo Arte', price: 49.03, max: 2 },
      { id: 'am_pre', title: 'Coleção Aprendendo Música', price: 49.03, max: 2 }
    ]
  },
  {
    id: 3,
    segment: 'Fundamental I',
    title: 'Anos Iniciais (1º ao 5º)',
    price: 1554.21,
    imageUrl: 'https://imagensplanoae.my.canva.site/_assets/media/f6116b4dc45cb833641077051b9757a0.png', 
    composition: ['Livros de Disciplinas Base', '2 Paradidáticos', 'Material Feras do Saber'],
    catalogUrl: 'https://imagensplanoae.my.canva.site/materiaisalicerces2027/anos-iniciais',
    optionals: [
      { id: 'pp15', title: 'Princípios em Pauta 1º a 5º ano', price: 104.59, max: 1 },
      { id: 'ap13', title: 'Aprender a Palavra 1º a 3º ano', price: 65.37, max: 1 },
      { id: 'ap45', title: 'Aprender a Palavra 4º a 5º ano', price: 89.89, max: 1 }
    ]
  },
  {
    id: 4,
    segment: 'Fundamental II',
    title: 'Anos Finais (6º ao 9º)',
    price: 1866.57,
    imageUrl: 'https://imagensplanoae.my.canva.site/_assets/media/93b3327bff86b48debbdab4494c9e440.png', 
    composition: ['Livros de Conteúdo Académico', 'Material Feras do Saber'],
    catalogUrl: 'https://imagensplanoae.my.canva.site/materiaisalicerces2027/anos-finais',
    optionals: [
      { id: 'ap69', title: 'Aprender a Palavra 6º a 9º ano', price: 89.89, max: 1 }
    ]
  }
];

const renewalDeadlines = {
  jun: { date: '30 de Junho', discount: 30 },
  jul: { date: '31 de Julho', discount: 25 },
  ago: { date: '31 de Agosto', discount: 20 },
  set: { date: '30 de Setembro', discount: 15 },
  out: { date: '30 de Outubro', discount: 0 }
};

const App = () => {
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedMonth, setSelectedMonth] = useState('jun');
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const calculateDiscount = (price) => price * (1 - renewalDeadlines[selectedMonth].discount / 100);

  const totals = useMemo(() => {
    const original = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discounted = cart.reduce((acc, item) => acc + (calculateDiscount(item.price) * item.quantity), 0);
    return { original, discounted, savings: original - discounted };
  }, [cart, selectedMonth]);

  const clearCart = () => setCart([]);

  const updateQuantity = (item, delta) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) return prev.filter(i => i.id !== item.id);
        if (newQty > (item.max || 999)) return prev;
        return prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i);
      }
      if (delta > 0) return [...prev, { ...item, quantity: 1 }];
      return prev;
    });
  };

  const toggleBaseKit = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.filter(i => i.id !== item.id));
    } else {
      setCart([...cart, { id: item.id, title: item.title, price: item.price, quantity: 1, type: 'base' }]);
    }
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {}
      <header className="bg-white border-b-4 border-[#50b0a7] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 lg:gap-8 overflow-hidden">
            {/* BOTÃO AGENDAR REUNIÃO (Superior Esquerdo) */}
            <a 
              href="https://tidycal.com/team/alicerces/atendimento-comercial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#50b0a7]/10 text-[#50b0a7] px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#50b0a7] hover:text-white transition-all shrink-0 border border-[#50b0a7]/20"
            >
              <Video size={14}/> Agendar Reunião
            </a>

            <div className="flex items-center gap-4 cursor-pointer shrink-0" onClick={() => navigateTo('home')}>
              <img src="https://imagensplanoae.my.canva.site/_assets/media/84185005abc57baaff31bc88d8671294.png" alt="Logo" className="h-14 w-auto" />
            </div>
          </div>
          
          <nav className="hidden lg:flex gap-8 text-[13px] font-black uppercase tracking-[0.1em]">
            <button onClick={() => navigateTo('home')} className={currentView === 'home' ? 'text-[#50b0a7] border-b-2 border-[#50b0a7] pb-1' : 'text-slate-400 hover:text-[#50b0a7] transition-colors'}>Home</button>
            <button onClick={() => navigateTo('materiais')} className={currentView === 'materiais' ? 'text-[#50b0a7] border-b-2 border-[#50b0a7] pb-1' : 'text-slate-400 hover:text-[#50b0a7] transition-colors'}>Materiais e Simulador</button>
            <button onClick={() => navigateTo('financeiro')} className={currentView === 'financeiro' ? 'text-[#50b0a7] border-b-2 border-[#50b0a7] pb-1' : 'text-slate-400 hover:text-[#50b0a7] transition-colors'}>Financeiro</button>
          </nav>

          <div className="flex items-center gap-3">
            {/* BOTÃO ESCOLHER KITS (Header) */}
            <a 
              href="https://aep.alicercesdoensino.com.br/escolhadosprodutosatuais" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#f38932] text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-orange-200 shrink-0"
            >
              Escolher meus kits 2027
            </a>

            <button className="lg:hidden p-2 text-[#50b0a7]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <button onClick={() => navigateTo('home')} className="text-left font-black uppercase text-[13px] p-2">Home</button>
            <button onClick={() => navigateTo('materiais')} className="text-left font-black uppercase text-[13px] p-2">Materiais</button>
            <button onClick={() => navigateTo('financeiro')} className="text-left font-black uppercase text-[13px] p-2">Financeiro</button>
            <hr />
            <a href="https://tidycal.com/team/alicerces/atendimento-comercial" target="_blank" className="bg-slate-100 p-4 rounded-xl font-black uppercase text-[11px] text-center">Agendar Reunião</a>
            <a href="https://aep.alicercesdoensino.com.br/escolhadosprodutosatuais" target="_blank" className="bg-[#f38932] text-white p-4 rounded-xl font-black uppercase text-[11px] text-center">Escolher meus kits 2027</a>
          </div>
        )}
      </header>

      {}
      <main>
        {currentView === 'home' && (
          <>
            <section className="bg-[#50b0a7] text-white py-20 px-4">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter uppercase">Prepare a sua escola para 2027.</h2>
                  <p className="text-lg opacity-90 font-medium">Simule agora os kits e veja os descontos exclusivos de renovação antecipada.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button onClick={() => navigateTo('materiais')} className="bg-white text-[#50b0a7] px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase">
                      Simular Materiais <ArrowRight />
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img src="https://imagensplanoae.my.canva.site/_assets/media/bf035b970d21f2df96c272a8b500172d.png" alt="Capa" className="w-full rounded-[3rem] shadow-2xl rotate-2" />
                </div>
              </div>
            </section>
            
            {/* CTA GLOBAL NA HOME */}
            <section className="py-20 bg-white text-center px-4">
              <div className="max-w-3xl mx-auto bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">Pronto para o próximo passo?</h3>
                <p className="text-slate-500 font-bold mb-8 italic">Garanta já a estrutura pedagógica completa para o seu ano letivo de 2027.</p>
                <a 
                  href="https://aep.alicercesdoensino.com.br/escolhadosprodutosatuais" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#f38932] text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase"
                >
                  ESCOLHER MEUS KITS PARA 2027 <ArrowRight />
                </a>
              </div>
            </section>
          </>
        )}

        {}
        {currentView === 'materiais' && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Seletor de Mês */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-12">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Calendar size={14}/> Mês da Renovação (Define o Desconto):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(renewalDeadlines).map(([key, data]) => (
                    <button key={key} onClick={() => setSelectedMonth(key)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${selectedMonth === key ? 'border-[#50b0a7] bg-[#50b0a7]/5 text-[#50b0a7]' : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}>
                      <span className="text-xs font-black uppercase">{key}</span>
                      <span className="text-lg font-black">{data.discount}% OFF</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-12">
                  {baseCollections.map(item => (
                    <div key={item.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                      <div className="grid md:grid-cols-12 gap-8">
                        <div className="md:col-span-4">
                          <img src={item.imageUrl} alt={item.title} className="w-full rounded-2xl shadow-lg" />
                        </div>
                        <div className="md:col-span-8 space-y-4">
                          <span className="text-xs font-black text-[#f38932] uppercase tracking-widest">{item.segment}</span>
                          <h4 className="text-3xl font-black text-slate-800 tracking-tighter">{item.title}</h4>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h5 className="font-black text-[#50b0a7] mb-3 uppercase text-[10px] tracking-widest flex items-center gap-2"><BookOpen size={16}/> Kit Base:</h5>
                            <ul className="space-y-1.5">
                              {item.composition.map((c, i) => (
                                <li key={i} className="flex items-center gap-2 font-bold text-slate-600 text-xs">
                                  <CheckCircle2 size={14} className="text-[#50b0a7]" /> {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button onClick={() => toggleBaseKit(item)}
                              className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${cart.find(i => i.id === item.id) ? 'bg-[#f38932] text-white' : 'bg-[#50b0a7] text-white hover:scale-105'}`}>
                              {cart.find(i => i.id === item.id) ? 'Kit Adicionado ✓' : 'Adicionar Kit Base'}
                            </button>
                            <a href={item.catalogUrl} target="_blank" rel="noreferrer" className="bg-slate-100 px-6 py-3 rounded-xl font-black text-[10px] uppercase text-slate-400 hover:bg-slate-200 text-center">Ver Catálogo</a>
                          </div>
                        </div>
                      </div>
                      {/* Opcionais */}
                      <div className="mt-8 pt-8 border-t border-dashed border-slate-200">
                        <h5 className="font-black text-[#f38932] mb-4 uppercase text-[10px] tracking-widest flex items-center gap-2"><Star size={14} fill="#f38932"/> Materiais Opcionais:</h5>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {item.optionals.map(opt => {
                            const inCart = cart.find(c => c.id === opt.id);
                            return (
                              <div key={opt.id} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-[#50b0a7] transition-all">
                                <h6 className="font-black text-slate-700 text-xs leading-tight mb-1">{opt.title}</h6>
                                <p className="text-[10px] font-black text-[#50b0a7] mb-3">R$ {opt.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                                <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-slate-100">
                                  <button onClick={() => updateQuantity(opt, -1)} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:text-red-400"><Minus size={14}/></button>
                                  <span className="font-black text-sm">{inCart?.quantity || 0}</span>
                                  <button onClick={() => updateQuantity(opt, 1)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${inCart?.quantity >= opt.max ? 'bg-slate-50 text-slate-200 cursor-not-allowed' : 'bg-[#50b0a7]/10 text-[#50b0a7] hover:bg-[#50b0a7] hover:text-white'}`}><Plus size={14}/></button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SIMULADOR LATERAL */}
                <div className="lg:col-span-4 sticky top-32">
                  <div className="bg-[#50b0a7] p-8 rounded-[3rem] text-white shadow-2xl border-b-[12px] border-[#3d8a83]">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-black uppercase flex items-center gap-2 tracking-widest text-sm"><Calculator size={20}/> Resumo Proposta</h4>
                      <button onClick={clearCart} className="bg-white/20 hover:bg-white/40 p-2 rounded-xl transition-colors" title="Limpar Simulação"><Trash2 size={14}/></button>
                    </div>

                    {/* BOTÕES DE DESCONTO SUPERIORES ADICIONADOS AQUI */}
                    <div className="grid grid-cols-5 gap-1 mb-6 bg-white/10 p-1.5 rounded-xl border border-white/10">
                      {Object.entries(renewalDeadlines).map(([key, data]) => (
                        <button 
                          key={key} 
                          onClick={() => setSelectedMonth(key)}
                          className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all flex flex-col items-center justify-center ${selectedMonth === key ? 'bg-white text-[#50b0a7] shadow-sm' : 'text-white/70 hover:bg-white/5'}`}
                        >
                          <span>{key}</span>
                          <span className="font-black">{data.discount}%</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between border-b border-white/20 pb-4">
                        <span className="font-bold text-sm opacity-80">Desconto ativo ({renewalDeadlines[selectedMonth].date}):</span> 
                        <span className="bg-white text-[#50b0a7] px-3 py-1 rounded-full text-xs font-black">{renewalDeadlines[selectedMonth].discount}%</span>
                      </div>
                      <div className="text-center py-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Total Estimado</p>
                        <p className="text-4xl font-black tracking-tighter">R$ {totals.discounted.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                      </div>
                      {totals.savings > 0 && (
                        <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-center">
                          <span className="text-[10px] font-black uppercase text-white/70">Sua Economia:</span>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <Wallet size={18} className="text-[#f38932]"/><span className="text-xl font-black">R$ {totals.savings.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* BOTÃO ESCOLHER KITS (Simulador) */}
                      <a 
                        href="https://aep.alicercesdoensino.com.br/escolhadosprodutosatuais" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-[#f38932] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                      >
                        ESCOLHER MEUS KITS PARA 2027 <ArrowRight size={16}/>
                      </a>

                      <button onClick={clearCart} className="w-full py-3 border-2 border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <Trash2 size={14}/> Reiniciar Simulação
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {}
        {currentView === 'financeiro' && (
          <section className="py-20 px-4 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center mb-16">
                <span className="text-[#f38932] font-black text-xs uppercase tracking-[0.4em] mb-4 block">Planejamento 2027</span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tighter">Formas de Contratação</h3>
                <div className="h-1.5 w-24 bg-[#50b0a7] mx-auto rounded-full mt-6"></div>
              </div>

              {/* BLOCOS LADO A LADO: COMPRA ESCOLA vs COMPRA PAIS */}
              <div className="grid lg:grid-cols-2 gap-8 mb-20">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-[#50b0a7]/10 p-4 rounded-2xl">
                      <Building2 size={40} className="text-[#50b0a7]"/>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase tracking-tight">Compra Direta da Escola</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gestão Institucional</p>
                    </div>
                  </div>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                    A escola realiza a compra diretamente pela loja da Editora, com pagamento via boleto bancário. Os materiais podem ser enviados de forma bimestral ou semestral diretamente para a instituição.
                  </p>
                  <div className="space-y-4 mt-auto">
                    {[
                      { icon: <CheckCircle2 size={18}/>, text: "Gestão centralizada pela escola" },
                      { icon: <CheckCircle2 size={18}/>, text: "Possibilidade de planejamento por bimestre ou semestre" },
                      { icon: <CreditCard size={18}/>, text: "Parcelamento via boleto bancário" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px] font-black uppercase text-[#50b0a7]">
                        {item.icon} {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl border-b-[12px] border-[#f38932] text-white flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#f38932] text-white px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">Recomendado</div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-white/10 p-4 rounded-2xl">
                      <Users2 size={40} className="text-[#f38932]"/>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase tracking-tight">Compra Direta dos Pais</h4>
                      <p className="text-xs font-bold text-[#f38932] uppercase tracking-widest italic">Mais praticidade para a escola</p>
                    </div>
                  </div>
                  <p className="text-slate-300 font-medium text-sm leading-relaxed mb-8">
                    Os pais realizam a compra diretamente no site da Editora utilizando uma chave de acesso exclusiva da instituição.
                  </p>
                  <div className="space-y-4 mt-auto">
                    {[
                      { icon: <ShieldCheck size={18}/>, text: "Redução significativa da inadimplência" },
                      { icon: <CreditCard size={18}/>, text: "Parcelamento em até 12x sem juros para as famílias" },
                      { icon: <Package size={18}/>, text: "Materiais enviados semestralmente para a escola" },
                      { icon: <CheckCircle2 size={18}/>, text: "Possibilidade de comissionamento comercial [Agende com o consultor para conhecer os critérios]" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px] font-black uppercase text-[#f38932]">
                        {item.icon} {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DETALHAMENTO: COMPRA ESCOLA */}
              <div className="mb-24">
                <div className="flex items-center gap-3 mb-10 pb-4 border-b-2 border-slate-100">
                  <div className="bg-[#50b0a7] text-white p-2 rounded-lg"><Building2 size={24}/></div>
                  <h4 className="text-2xl font-black uppercase tracking-tight">Compra Direta da Escola</h4>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h5 className="flex items-center gap-2 text-lg font-black text-[#50b0a7] uppercase"><Clock size={20}/> Opção 1 — Compra Bimestral</h5>
                    
                    {[
                      { 
                        b: "1º Bimestre", 
                        rows: [
                          { j: "Até 15 de outubro", e: "05 de janeiro", p: "Até 4x" }, 
                          { j: "Até 15 de novembro", e: "05 de janeiro", p: "Até 3x" }
                        ] 
                      },
                      { 
                        b: "2º Bimestre", 
                        rows: [
                          { j: "Até 15 de fevereiro", e: "20 de março", p: "Até 3x" }
                        ] 
                      },
                      { 
                        b: "3º Bimestre", 
                        rows: [
                          { j: "Até 15 de maio", e: "05 de junho", p: "Até 3x" }
                        ] 
                      },
                      { 
                        b: "4º Bimestre", 
                        rows: [
                          { j: "Até 15 de julho", e: "20 de agosto", p: "Até 3x" }
                        ] 
                      }
                    ].map((bim, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{bim.b}</span>
                        <div className="grid grid-cols-3 gap-2 text-[10px] font-black uppercase text-slate-500 mb-2 border-b border-slate-50 pb-2">
                          <span>Janela de Compra</span>
                          <span>Data de Embarque</span>
                          <span>Parcelamento</span>
                        </div>
                        {bim.rows.map((r, idx) => (
                          <div key={idx} className="grid grid-cols-3 gap-2 text-xs font-bold text-slate-700 py-1.5">
                            <span>{r.j}</span>
                            <span className="text-[#50b0a7]">{r.e}</span>
                            <span className="bg-slate-50 px-2 py-0.5 rounded text-center">{r.p}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <h5 className="flex items-center gap-2 text-lg font-black text-[#50b0a7] uppercase"><Package size={20}/> Opção 2 — Compra Semestral</h5>
                    <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
                      <h6 className="font-black text-[#f38932] text-sm uppercase mb-4">1º Semestre</h6>
                      <div className="space-y-4">
                        {[
                          { j: "Até 30 de setembro", e: "05 de janeiro", p: "6x" },
                          { j: "Até 30 de outubro", e: "05 de janeiro", p: "5x" },
                          { j: "Até 30 de novembro", e: "05 de janeiro", p: "4x" }
                        ].map((r, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-black uppercase text-slate-400">{r.j} → Embarque {r.e}</div>
                            <div className="bg-[#50b0a7]/10 text-[#50b0a7] px-3 py-1 rounded-full text-xs font-black">Até {r.p}</div>
                          </div>
                        ))}
                      </div>
                      <h6 className="font-black text-[#f38932] text-sm uppercase mb-4 mt-8">2º Semestre</h6>
                      <div className="flex justify-between items-center p-3 bg-white rounded-2xl border border-slate-100">
                        <div className="text-[10px] font-black uppercase text-slate-400">Até 30 de abril → Embarque 05 de junho</div>
                        <div className="bg-[#50b0a7]/10 text-[#50b0a7] px-3 py-1 rounded-full text-xs font-black">Até 6x</div>
                      </div>
                    </div>

                    {/* INFORMAÇÕES COMPLEMENTARES */}
                    <div className="bg-white p-8 rounded-[3rem] border-2 border-dashed border-slate-200">
                       <h5 className="flex items-center gap-2 text-lg font-black text-slate-800 uppercase mb-6"><Info size={20}/> Informações Complementares</h5>
                       <ul className="space-y-4">
                          <li className="flex gap-3 text-xs font-bold text-slate-600">
                            <CheckCircle2 size={16} className="text-[#f38932] shrink-0"/> O custo do frete corresponds a 5% do valor total do pedido.
                          </li>
                          <li className="flex gap-3 text-xs font-bold text-slate-600">
                            <CheckCircle2 size={16} className="text-[#f38932] shrink-0"/> Pedidos complementares podem ser realizados ao longo do ano letivo.
                          </li>
                          <li className="flex gap-3 text-xs font-bold text-slate-600">
                            <CheckCircle2 size={16} className="text-[#f38932] shrink-0"/> Pedidos complementares com valor inferior a R$ 5.000,00 poderão ser parcelados em até 3x no boleto bancário.
                          </li>
                       </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* DETALHAMENTO: COMPRA PAIS */}
              <div className="mb-24">
                <div className="flex items-center gap-3 mb-10 pb-4 border-b-2 border-slate-100">
                  <div className="bg-[#f38932] text-white p-2 rounded-lg"><Users2 size={24}/></div>
                  <h4 className="text-2xl font-black uppercase tracking-tight">Compra Direta dos Pais</h4>
                </div>
                <p className="text-slate-500 font-bold mb-10 italic text-center max-w-3xl mx-auto">Nesta modalidade, os pais realizam a compra diretamente no site da Editora utilizando a chave de acesso exclusiva da escola.</p>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                   <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                      <h5 className="font-black text-xs uppercase tracking-widest text-[#f38932] flex items-center gap-2"><Key size={16}/> Condições da Modalidade</h5>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-[#50b0a7]"/> Parcelamento em até 12x sem juros</li>
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-[#50b0a7]"/> Materiais enviados semestralmente para a escola</li>
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-[#50b0a7]"/> Frete correspondente a 5% do valor total do pedido</li>
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-600"><CheckCircle2 size={16} className="text-[#50b0a7]"/> Redução da inadimplência e praticidade operacional</li>
                      </ul>
                   </div>
                   <div className="space-y-6">
                      <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
                        <h5 className="font-black text-xs uppercase tracking-widest text-[#f38932] mb-4 flex items-center gap-2"><Truck size={16}/> Entrega do 1º Semestre</h5>
                        <p className="text-xs font-bold text-slate-300 leading-relaxed italic">A escola define uma data de corte para encerramento das compras das famílias. Após essa data o material será despachado em até 7 dias úteis.</p>
                      </div>
                      <div className="bg-[#f38932]/5 p-10 rounded-[3rem] border border-[#f38932]/20">
                        <h5 className="font-black text-xs uppercase tracking-widest text-[#f38932] mb-4 flex items-center gap-2"><Calendar size={16}/> Entrega do 2º Semestre</h5>
                        <p className="text-xs font-bold text-slate-600 leading-relaxed italic">Os materiais do segundo semestre serão despachados até 5 de junho.</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* LOGÍSTICA E PRAZOS (AO FINAL) */}
              <div className="pt-12 border-t-2 border-slate-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#50b0a7] text-white p-4 rounded-2xl shadow-lg"><Truck size={32}/></div>
                    <div>
                      <h4 className="text-3xl font-black uppercase tracking-tight">Prazo Médio de Entrega</h4>
                      <p className="text-xs font-bold text-[#f38932] uppercase tracking-widest italic mt-1">* O prazo começa a contar APÓS a data de despacho (embarque)</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-auto mt-8 md:mt-0">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Sul e Sudeste</p>
                      <p className="font-black text-sm text-[#50b0a7]">3 a 7 dias úteis</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Centro-Oeste</p>
                      <p className="font-black text-sm text-[#50b0a7]">7 a 10 dias úteis</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Norte e Nordeste</p>
                      <p className="font-black text-sm text-[#50b0a7]">7 a 15 dias úteis</p>
                    </div>
                  </div>
                </div>

                {/* BOTÃO ESCOLHER KITS (Fim do Financeiro) */}
                <div className="mt-16 text-center">
                  <a 
                    href="https://aep.alicercesdoensino.com.br/escolhadosprodutosatuais" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#f38932] text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase"
                  >
                    ESCOLHER MEUS KITS PARA 2027 <ArrowRight />
                  </a>
                </div>
              </div>

            </div>
          </section>
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer className="py-12 text-center border-t border-slate-200 bg-white">
         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <img src="https://imagensplanoae.my.canva.site/_assets/media/84185005abc57baaff31bc88d8671294.png" alt="Logo Principal" className="h-14 w-auto" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a href="https://tidycal.com/team/alicerces/atendimento-comercial" target="_blank" className="text-[11px] font-black uppercase text-slate-400 hover:text-[#50b0a7]">Agendar Reunião</a>
              <span className="text-slate-200">•</span>
              <a href="https://aep.alicercesdoensino.com.br/escolhadosprodutosatuais" target="_blank" className="text-[11px] font-black uppercase text-slate-400 hover:text-[#f38932]">Escolher Kits 2027</a>
            </div>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest italic mt-8">© 2027 Editora Cristã Evangélica - Todos os Direitos Reservados</p>
         </div>
      </footer>
    </div>
  );
};

export default App;