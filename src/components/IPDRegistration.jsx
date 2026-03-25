import { useState, useEffect } from "react";

const T={primary:"#0B2545",primaryDark:"#071830",primaryMid:"#1A4A7A",primaryLight:"#2563A8",accent:"#38BDF8",accentDark:"#0EA5E9",accentDeep:"#0284C7",accentLight:"#BAE6FD",bgPage:"#EBF6FD",bgTint:"#E0F2FE",bgTint2:"#BAE6FD",white:"#FFFFFF",offwhite:"#F0F9FF",border:"#BFDBEE",borderHov:"#90C4E4",text:"#0B2040",textMid:"#1E4976",textMuted:"#4A7FA5",textLight:"#88B4CC",red:"#DC2626",redTint:"#FEF2F2",green:"#059669",greenTint:"#ECFDF5",greenBorder:"#A7F3D0",amber:"#D97706",amberTint:"#FEF3C7",shadow:"0 1px 4px rgba(11,37,69,.07), 0 6px 20px rgba(11,37,69,.06)",shadowMd:"0 4px 12px rgba(11,37,69,.1), 0 12px 32px rgba(11,37,69,.08)",shadowLg:"0 8px 24px rgba(11,37,69,.14), 0 24px 56px rgba(11,37,69,.1)"};

const LOCATIONS=[{id:"laxmi",name:"Laxmi Nagar",city:"Mathura",short:"LNM",color:"#0EA5E9"},{id:"raya",name:"Raya",city:"Mathura",short:"RYM",color:"#7C3AED"}];

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased}
body{font-family:'DM Sans',sans-serif;background:${T.bgPage};color:${T.text};min-height:100vh;font-size:14px;line-height:1.6}
::selection{background:${T.accentLight};color:${T.primary}}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.borderHov};border-radius:4px}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{transform:scale(.82);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulseDot{0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,.55)}50%{box-shadow:0 0 0 7px rgba(56,189,248,0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.hdr{background:${T.primary};height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;position:sticky;top:0;z-index:300;box-shadow:0 1px 0 rgba(56,189,248,.18),0 4px 24px rgba(0,0,0,.25)}
.hdr-left{display:flex;align-items:center;gap:13px}
.hdr-logo{width:40px;height:40px;border-radius:11px;background:rgba(56,189,248,.15);border:1px solid rgba(56,189,248,.28);display:flex;align-items:center;justify-content:center;color:${T.accent};flex-shrink:0}
.hdr-name{font-family:'DM Serif Display',serif;font-size:18px;color:#fff;letter-spacing:.01em}
.hdr-sub{font-size:11px;color:rgba(255,255,255,.38);font-weight:400;letter-spacing:.07em;text-transform:uppercase;margin-top:1px}
.loc-switcher{position:relative;margin:0 8px}
.loc-btn{display:flex;align-items:center;gap:9px;padding:7px 14px;border-radius:10px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.15);cursor:pointer;transition:all .18s;color:#fff}
.loc-btn:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.25)}
.loc-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.loc-name{font-size:13px;font-weight:600;color:#fff}
.loc-city{font-size:11px;color:rgba(255,255,255,.45);font-weight:400}
.loc-chevron{color:rgba(255,255,255,.4);transition:transform .18s;display:flex;align-items:center}
.loc-chevron.open{transform:rotate(180deg)}
.loc-dropdown{position:absolute;top:calc(100% + 8px);left:0;min-width:220px;background:${T.white};border:1px solid ${T.border};border-radius:14px;box-shadow:0 8px 32px rgba(11,37,69,.2);z-index:500;overflow:hidden;animation:slideDown .2s ease both}
.loc-option{display:flex;align-items:center;gap:12px;padding:13px 16px;cursor:pointer;transition:background .15s;border-bottom:1px solid ${T.border}}
.loc-option:last-child{border-bottom:none}
.loc-option:hover,.loc-option.active{background:${T.bgTint}}
.loc-opt-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.loc-opt-name{font-size:14px;font-weight:600;color:${T.primary}}
.loc-opt-city{font-size:12px;color:${T.textMuted}}
.loc-opt-check{margin-left:auto;color:${T.accentDeep};display:flex;align-items:center}
.hdr-right{display:flex;align-items:center;gap:12px}
.hdr-uhid{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.25);font-size:12px;color:rgba(255,255,255,.85);font-weight:600;letter-spacing:.03em}
.hdr-uhid-label{font-size:10px;color:rgba(255,255,255,.38);font-weight:400;text-transform:uppercase;letter-spacing:.07em;margin-right:2px}
.hdr-date{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:20px;background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.22);font-size:12px;color:rgba(255,255,255,.85);font-weight:500;letter-spacing:.01em}
.hdr-date-ico{color:${T.accent};display:flex;align-items:center;flex-shrink:0}
.layout{display:flex;min-height:calc(100vh - 64px)}
.sidebar{width:234px;background:${T.white};border-right:1px solid ${T.border};flex-shrink:0;position:sticky;top:64px;height:calc(100vh - 64px);overflow-y:auto;display:flex;flex-direction:column}
.sidebar-top{padding:22px 18px 14px}
.sidebar-section-label{font-size:10.5px;font-weight:700;color:${T.textLight};text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;padding:0 8px}
.nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:all .18s ease;margin-bottom:3px}
.nav-item:hover{background:${T.bgTint}}
.nav-item.active{background:${T.primary}}
.nav-item.locked{opacity:.38;cursor:not-allowed}
.nav-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s}
.nav-item .nav-icon{background:${T.bgTint};color:${T.textMuted}}
.nav-item:hover .nav-icon{background:${T.bgTint2};color:${T.accentDeep}}
.nav-item.active .nav-icon{background:rgba(56,189,248,.18);color:${T.accent}}
.nav-label{font-size:13.5px;font-weight:500;color:${T.textMid};transition:color .18s}
.nav-item:hover .nav-label{color:${T.primary}}
.nav-item.active .nav-label{color:#fff;font-weight:600}
.nav-step-num{width:18px;height:18px;border-radius:50%;background:${T.border};color:${T.textLight};font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-left:auto;flex-shrink:0}
.nav-item.active .nav-step-num{background:rgba(56,189,248,.28);color:${T.accent}}
.nav-item.done .nav-step-num{background:${T.accent};color:${T.primary}}
.nav-item.done .nav-icon{background:${T.bgTint2};color:${T.accentDeep}}
.nav-item.done .nav-label{color:${T.textMid}}
.sidebar-bottom{margin-top:auto;padding:18px;border-top:1px solid ${T.border}}
.uhid-card{background:${T.bgTint};border:1px solid ${T.border};border-radius:12px;padding:14px;text-align:center}
.uhid-card-label{font-size:10px;font-weight:700;color:${T.textMuted};text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
.uhid-card-val{font-family:'DM Serif Display',serif;font-size:17px;color:${T.primary};letter-spacing:.03em}
.uhid-card-sub{font-size:11px;color:${T.textLight};margin-top:3px}
.main{flex:1;overflow-y:auto}
.search-hero{background:linear-gradient(160deg,${T.primary} 0%,${T.primaryMid} 55%,${T.primaryLight} 100%);padding:44px 44px 0;position:relative;overflow:hidden}
.search-hero::before{content:'';position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:rgba(56,189,248,.07);pointer-events:none}
.hero-top{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;margin-bottom:36px;position:relative;z-index:1}
.hero-title{font-family:'DM Serif Display',serif;font-size:clamp(20px,3vw,30px);color:#fff;margin-bottom:7px;line-height:1.2;animation:fadeUp .4s ease both}
.hero-subtitle{font-size:14px;color:rgba(255,255,255,.52);animation:fadeUp .4s .06s ease both}
.hero-loc-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);font-size:12px;color:rgba(255,255,255,.7);font-weight:500;margin-top:10px;animation:fadeUp .4s .1s ease both}
.hero-stats{display:flex;gap:12px;animation:fadeUp .4s .1s ease both;flex-shrink:0}
.hero-stat{background:rgba(255,255,255,.14);border:1.5px solid rgba(56,189,248,.45);border-radius:14px;padding:16px 22px;text-align:center;min-width:96px;box-shadow:0 4px 16px rgba(0,0,0,.18)}
.hero-stat-num{font-family:'DM Serif Display',serif;font-size:30px;color:#fff;display:block;line-height:1;text-shadow:0 2px 8px rgba(56,189,248,.35)}
.hero-stat-lbl{font-size:11px;color:rgba(255,255,255,.65);font-weight:600;margin-top:5px;display:block;text-transform:uppercase;letter-spacing:.08em}
.search-panel{background:${T.white};border-radius:20px 20px 0 0;padding:30px 36px 34px;position:relative;z-index:2;box-shadow:0 -4px 40px rgba(11,37,69,.18);animation:fadeUp .4s .15s ease both}
.search-panel-title{display:flex;align-items:center;gap:10px;font-family:'DM Serif Display',serif;font-size:17px;color:${T.primary};margin-bottom:5px}
.search-panel-sub{font-size:13px;color:${T.textMuted};margin-bottom:22px}
.search-toggle{display:flex;background:${T.bgTint};border-radius:12px;padding:4px;gap:3px;border:1px solid ${T.border};margin-bottom:18px;width:fit-content}
.tgl-btn{display:flex;align-items:center;gap:8px;padding:9px 20px;border-radius:9px;border:none;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:500;cursor:pointer;transition:all .2s;color:${T.textMuted};background:transparent}
.tgl-btn.active{background:${T.primary};color:#fff;box-shadow:0 3px 10px rgba(11,37,69,.22)}
.search-input-group{display:flex;gap:12px;align-items:center}
.search-input-wrap{flex:1;position:relative}
.search-input-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:${T.textLight};pointer-events:none;display:flex;align-items:center}
.search-ctrl{font-family:'DM Sans',sans-serif;font-size:15px;color:${T.text};background:${T.offwhite};border:2px solid ${T.border};border-radius:12px;padding:13px 16px 13px 46px;width:100%;outline:none;transition:border-color .15s,box-shadow .15s,background .15s;line-height:1.5}
.search-ctrl::placeholder{color:${T.textLight}}
.search-ctrl:focus{border-color:${T.accentDeep};box-shadow:0 0 0 4px ${T.bgTint};background:${T.white}}
.search-clear{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:${T.textLight};display:flex;align-items:center;padding:2px;border-radius:4px}
.search-btn{padding:13px 26px;border-radius:12px;border:none;background:${T.primary};color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .18s;white-space:nowrap;box-shadow:0 4px 14px rgba(11,37,69,.28);flex-shrink:0}
.search-btn:hover{background:${T.primaryDark};transform:translateY(-1px)}
.new-patient-btn{padding:13px 20px;border-radius:12px;background:${T.white};color:${T.primaryMid};border:2px solid ${T.border};font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:7px;transition:all .18s;white-space:nowrap;flex-shrink:0}
.new-patient-btn:hover{border-color:${T.accentDeep};color:${T.primary};background:${T.bgTint}}
.search-hints{display:flex;align-items:center;gap:14px;margin-top:16px;padding-top:16px;border-top:1px solid ${T.border};flex-wrap:wrap}
.hint-label{font-size:12px;color:${T.textLight};font-weight:500;flex-shrink:0}
.hint-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;background:${T.bgTint};border:1px solid ${T.border};border-radius:20px;font-size:12px;color:${T.textMid};cursor:pointer;transition:all .15s;font-weight:500}
.hint-chip:hover{border-color:${T.accentDeep};color:${T.accentDeep}}
.content-area{padding:28px 44px 80px}
.result-found{border-radius:16px;overflow:hidden;border:2px solid ${T.accentDeep};box-shadow:${T.shadowMd};animation:scaleIn .3s ease both}
.result-found-hd{background:linear-gradient(135deg,${T.primary},${T.primaryMid});padding:20px 24px;display:flex;align-items:center;justify-content:space-between}
.rf-left{display:flex;align-items:center;gap:14px}
.rf-avatar{width:52px;height:52px;border-radius:50%;background:rgba(56,189,248,.18);border:2px solid rgba(56,189,248,.35);display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:20px;color:${T.accent};flex-shrink:0}
.rf-name{font-family:'DM Serif Display',serif;font-size:18px;color:#fff;margin-bottom:4px}
.rf-meta{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.rf-chip{display:inline-flex;align-items:center;gap:4px;padding:2px 10px;background:rgba(56,189,248,.15);border:1px solid rgba(56,189,248,.25);border-radius:20px;font-size:12px;color:${T.accentLight};font-weight:500}
.rf-count{display:flex;align-items:center;gap:7px;padding:7px 15px;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.22);border-radius:20px;font-size:13px;color:${T.accentLight};font-weight:600;flex-shrink:0}
.history-wrap{background:${T.white}}
.history-tabs{display:flex;border-bottom:1px solid ${T.border};background:${T.offwhite}}
.h-tab{flex:1;padding:13px 14px;border:none;background:transparent;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:${T.textMuted};cursor:pointer;transition:all .15s;border-bottom:2px solid transparent;margin-bottom:-1px;display:flex;align-items:center;justify-content:center;gap:7px}
.h-tab.active{color:${T.accentDeep};border-bottom-color:${T.accentDeep};background:${T.white};font-weight:600}
.h-tab:hover:not(.active){color:${T.primary};background:${T.bgTint}}
.history-body{padding:22px 26px}
.detail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.detail-item{background:${T.offwhite};border:1px solid ${T.border};border-radius:10px;padding:12px 14px}
.detail-item.hi{background:${T.bgTint}}
.detail-lbl{font-size:10.5px;font-weight:600;color:${T.textLight};text-transform:uppercase;letter-spacing:.07em;margin-bottom:4px}
.detail-val{font-size:14px;font-weight:500;color:${T.text}}
.adm-card{border:1px solid ${T.border};border-radius:14px;overflow:hidden;margin-bottom:14px;transition:all .18s;box-shadow:${T.shadow}}
.adm-card:hover{border-color:${T.borderHov};box-shadow:${T.shadowMd};transform:translateY(-1px)}
.adm-card-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:${T.offwhite};border-bottom:1px solid ${T.border}}
.adm-card-left{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.adm-num{font-family:'DM Serif Display',serif;font-size:14px;color:${T.primary};font-weight:600}
.adm-date{font-size:12px;color:${T.textMuted};padding:2px 9px;background:${T.bgTint};border-radius:20px;border:1px solid ${T.border}}
.adm-dept{font-size:12px;color:${T.accentDeep};padding:2px 9px;background:${T.offwhite};border-radius:20px;border:1px solid ${T.border};font-weight:500}
.adm-loc{font-size:11px;padding:2px 9px;border-radius:20px;border:1px solid;font-weight:600;opacity:.85}
.status-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600}
.badge-recovered{background:${T.greenTint};color:${T.green};border:1px solid ${T.greenBorder}}
.badge-referred{background:${T.amberTint};color:${T.amber};border:1px solid #FDE68A}
.badge-lama{background:${T.bgTint2};color:${T.accentDeep};border:1px solid ${T.border}}
.badge-default{background:${T.bgTint};color:${T.textMid};border:1px solid ${T.border}}
.adm-body{padding:16px 18px}
.adm-info-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
.adm-info-item .lbl{font-size:10.5px;font-weight:600;color:${T.textLight};text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}
.adm-info-item .val{font-size:13px;font-weight:500;color:${T.text}}
.adm-svc-list{background:${T.offwhite};border-radius:10px;padding:12px 14px;border:1px solid ${T.border}}
.adm-svc-hd{font-size:11px;font-weight:700;color:${T.textMuted};text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px}
.adm-svc-row{display:flex;justify-content:space-between;font-size:13px;padding:5px 0;color:${T.textMid};border-bottom:1px solid ${T.border}}
.adm-svc-row:last-of-type{border-bottom:none}
.adm-net{display:flex;justify-content:space-between;font-size:14px;font-weight:700;padding:10px 0 0;border-top:2px solid ${T.border};margin-top:4px;color:${T.primary}}
.new-adm-banner{background:linear-gradient(135deg,${T.primary} 0%,${T.primaryMid} 100%);border-radius:16px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:20px;box-shadow:${T.shadowMd};border:1px solid rgba(56,189,248,.2);animation:fadeUp .3s ease both}
.nab-icon{width:46px;height:46px;border-radius:12px;background:rgba(56,189,248,.15);border:1px solid rgba(56,189,248,.25);display:flex;align-items:center;justify-content:center;color:${T.accent};flex-shrink:0}
.nab-text h3{font-family:'DM Serif Display',serif;font-size:17px;color:#fff;margin-bottom:4px}
.nab-text p{font-size:13px;color:rgba(255,255,255,.55);line-height:1.5}
.nab-btn{padding:12px 24px;border-radius:12px;border:none;background:${T.accent};color:${T.primary};font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .2s;white-space:nowrap;flex-shrink:0;box-shadow:0 4px 14px rgba(56,189,248,.38)}
.nab-btn:hover{background:#7DD3F7;transform:translateY(-1px)}
.not-found{background:${T.white};border:2px dashed ${T.border};border-radius:16px;padding:48px 32px;text-align:center;animation:scaleIn .3s ease both}
.not-found-icon{width:70px;height:70px;border-radius:50%;background:${T.bgTint};border:2px solid ${T.border};display:flex;align-items:center;justify-content:center;margin:0 auto 18px;color:${T.textLight};animation:float 3s ease infinite}
.empty-state{padding:32px 44px 60px;animation:fadeIn .3s .2s ease both}
.info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px}
.info-card{background:${T.white};border:1px solid ${T.border};border-radius:16px;padding:22px;text-align:center;box-shadow:${T.shadow};transition:all .2s}
.info-card:hover{transform:translateY(-3px);box-shadow:${T.shadowMd}}
.info-card-icon{width:50px;height:50px;border-radius:13px;display:flex;align-items:center;justify-content:center;margin:0 auto 13px;font-size:22px}
.info-card-title{font-family:'DM Serif Display',serif;font-size:15px;color:${T.primary};margin-bottom:5px}
.info-card-desc{font-size:12.5px;color:${T.textMuted};line-height:1.6}
.recent-section{background:${T.white};border:1px solid ${T.border};border-radius:16px;overflow:hidden;box-shadow:${T.shadow}}
.recent-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid ${T.border};background:${T.offwhite}}
.recent-hd-title{font-family:'DM Serif Display',serif;font-size:15px;color:${T.primary};display:flex;align-items:center;gap:8px}
.recent-row{display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid ${T.border};transition:background .15s}
.recent-row:last-child{border-bottom:none}
.recent-row:hover{background:${T.bgTint}}
.recent-avatar{width:36px;height:36px;border-radius:50%;background:${T.bgTint};border:1px solid ${T.border};display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:13px;color:${T.primaryMid};font-weight:600;flex-shrink:0}
.recent-name{font-size:13.5px;font-weight:600;color:${T.text}}
.recent-sub{font-size:12px;color:${T.textMuted}}
.card{background:${T.white};border:1px solid ${T.border};border-radius:16px;margin-bottom:20px;overflow:hidden;box-shadow:${T.shadow};animation:fadeUp .3s ease both}
.card-hd{display:flex;align-items:center;gap:13px;padding:17px 22px;border-bottom:1px solid ${T.border};background:${T.offwhite}}
.card-ico{width:36px;height:36px;border-radius:10px;background:${T.bgTint};border:1px solid ${T.border};display:flex;align-items:center;justify-content:center;color:${T.accentDeep};flex-shrink:0}
.card-ttl{font-family:'DM Serif Display',serif;font-size:15px;color:${T.primary}}
.card-sub{font-size:12px;color:${T.textMuted};margin-top:2px}
.card-bd{padding:24px}
.form-page{padding:32px 44px 80px;animation:fadeUp .3s ease both}
.page-hd{margin-bottom:26px}
.page-hd h1{font-family:'DM Serif Display',serif;font-size:26px;color:${T.primary};margin-bottom:5px}
.page-hd p{font-size:14px;color:${T.textMuted}}
.page-hd-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:26px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.s2{grid-column:span 2}
.mt{margin-top:20px}
.div-lbl{font-size:11px;font-weight:700;color:${T.textLight};text-transform:uppercase;letter-spacing:.09em;display:flex;align-items:center;gap:10px;margin:22px 0 16px}
.div-lbl::after{content:'';flex:1;height:1px;background:${T.border}}
.fld{display:flex;flex-direction:column}
.fld label{font-size:11.5px;font-weight:600;color:${T.textMuted};text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px;display:flex;align-items:center;gap:3px}
.req{color:${T.red}}
.ctrl{font-family:'DM Sans',sans-serif;font-size:14px;color:${T.text};background:${T.white};border:1.5px solid ${T.border};border-radius:10px;padding:11px 14px;width:100%;outline:none;appearance:none;transition:border-color .15s,box-shadow .15s,background .15s;line-height:1.5}
.ctrl::placeholder{color:${T.textLight}}
.ctrl:hover{border-color:${T.borderHov}}
.ctrl:focus{border-color:${T.accentDeep};box-shadow:0 0 0 4px ${T.bgTint};background:${T.offwhite}}
.ctrl.err{border-color:${T.red}}
textarea.ctrl{resize:vertical;min-height:80px}
.sel-w{position:relative}
.sel-arr{position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:${T.textLight}}
.fld-err{font-size:12px;color:${T.red};margin-top:5px;font-weight:500}
.svc-th{display:grid;grid-template-columns:2fr .85fr 1.6fr 100px 68px 100px 36px;gap:10px;padding:0 14px 10px}
.svc-th span{font-size:11px;font-weight:600;color:${T.textLight};text-transform:uppercase;letter-spacing:.06em}
.svc-row{display:grid;grid-template-columns:2fr .85fr 1.6fr 100px 68px 100px 36px;gap:10px;align-items:center;padding:11px 14px;background:${T.offwhite};border:1px solid ${T.border};border-radius:12px;margin-bottom:10px;animation:fadeUp .2s ease both;transition:border-color .15s}
.svc-row:hover{border-color:${T.borderHov}}
.sc{font-family:'DM Sans',sans-serif;font-size:13px;color:${T.text};background:${T.white};border:1.5px solid ${T.border};border-radius:8px;padding:8px 10px;width:100%;outline:none;appearance:none;transition:border-color .15s,box-shadow .15s}
.sc::placeholder{color:${T.textLight}}
.sc:focus{border-color:${T.accentDeep};box-shadow:0 0 0 3px ${T.bgTint}}
.sc-w{position:relative}
.sc-a{position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none;color:${T.textLight}}
.svc-tot{font-size:14px;font-weight:600;color:${T.primary};text-align:right;padding-right:2px}
.svc-del{width:32px;height:32px;border-radius:8px;border:1.5px solid ${T.border};background:${T.white};cursor:pointer;display:flex;align-items:center;justify-content:center;color:${T.textMuted};transition:all .15s;flex-shrink:0}
.svc-del:hover{background:${T.redTint};border-color:${T.red};color:${T.red}}
.add-svc{width:100%;margin-top:10px;padding:12px;background:transparent;border:1.5px dashed ${T.border};border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:500;color:${T.textMuted};transition:all .15s}
.add-svc:hover{border-color:${T.accentDeep};color:${T.accentDeep};background:${T.bgTint}}
.subtot{display:flex;justify-content:flex-end;align-items:center;gap:14px;margin-top:16px;padding:14px 20px;background:${T.bgTint};border:1px solid ${T.border};border-radius:12px}
.subtot-lbl{font-size:13px;color:${T.textMid};font-weight:500}
.subtot-val{font-family:'DM Serif Display',serif;font-size:22px;color:${T.primary}}
.inv-card{background:${T.white};border:1px solid ${T.border};border-radius:16px;overflow:hidden;margin-bottom:20px;box-shadow:${T.shadowLg}}
.inv-hd{background:${T.primary};padding:20px 26px;display:flex;align-items:center;gap:14px}
.inv-hd-ico{width:38px;height:38px;border-radius:10px;background:rgba(56,189,248,.15);border:1px solid rgba(56,189,248,.28);display:flex;align-items:center;justify-content:center;color:${T.accent};flex-shrink:0}
.inv-hd-ttl{font-family:'DM Serif Display',serif;font-size:17px;color:#fff}
.inv-hd-sub{font-size:12px;color:rgba(255,255,255,.4);margin-top:2px}
.inv-rows{padding:4px 26px 0}
.inv-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid ${T.border}}
.inv-row:last-child{border-bottom:none}
.inv-lbl{font-size:14px;color:${T.textMid}}
.inv-val{font-size:14px;font-weight:600;color:${T.text}}
.inv-net{display:flex;justify-content:space-between;align-items:center;padding:20px 26px;background:${T.primary};margin-top:8px}
.net-lbl{font-size:11px;font-weight:600;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.1em}
.net-val{font-family:'DM Serif Display',serif;font-size:30px;color:#fff}
.pay-pill{margin:0 26px 18px;padding:10px 16px;background:${T.bgTint};border:1px solid ${T.border};border-radius:10px;font-size:13px;color:${T.accentDeep};font-weight:500;display:flex;align-items:center;gap:8px}
.ph-overlay{position:fixed;inset:0;background:rgba(11,37,69,.72);z-index:900;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px;overflow-y:auto;animation:fadeIn .2s ease both}
.ph-modal{background:${T.white};border-radius:20px;width:100%;max-width:860px;box-shadow:0 20px 60px rgba(0,0,0,.3);animation:fadeUp .25s ease both;overflow:hidden}
.ph-hd{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:${T.primary};border-radius:20px 20px 0 0}
.ph-hd-left{display:flex;align-items:center;gap:12px}
.ph-hd-ico{width:38px;height:38px;border-radius:10px;background:rgba(56,189,248,.18);border:1px solid rgba(56,189,248,.28);display:flex;align-items:center;justify-content:center;color:${T.accent};flex-shrink:0}
.ph-hd-title{font-family:'DM Serif Display',serif;font-size:18px;color:#fff}
.ph-hd-sub{font-size:12px;color:rgba(255,255,255,.42);margin-top:2px}
.ph-close{width:34px;height:34px;border-radius:8px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.7);transition:all .15s}
.ph-close:hover{background:rgba(255,255,255,.18);color:#fff}
.ph-body{padding:22px 24px}
.ph-stats{display:flex;gap:10px;margin-bottom:20px}
.ph-stat{flex:1;background:${T.bgTint};border:1px solid ${T.border};border-radius:12px;padding:12px 16px;text-align:center}
.ph-stat-num{font-family:'DM Serif Display',serif;font-size:20px;color:${T.primary};display:block;line-height:1}
.ph-stat-lbl{font-size:11px;color:${T.textMuted};font-weight:500;margin-top:4px;display:block;text-transform:uppercase;letter-spacing:.05em}
.ph-table-wrap{border:1px solid ${T.border};border-radius:14px;overflow:hidden}
.ph-table{width:100%;border-collapse:collapse}
.ph-table thead tr{background:${T.primary}}
.ph-table th{padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:rgba(255,255,255,.75);text-transform:uppercase;letter-spacing:.06em}
.ph-table tbody tr{border-bottom:1px solid ${T.border};transition:background .15s}
.ph-table tbody tr:last-child{border-bottom:none}
.ph-table tbody tr:hover{background:${T.bgTint}}
.ph-table td{padding:12px 14px;font-size:13.5px;color:${T.text};vertical-align:middle}
.ph-name{font-weight:600;color:${T.primary}}
.ph-uhid{font-size:12px;color:${T.textMuted};margin-top:2px}
.ph-dod{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;color:${T.green};font-weight:500}
.ph-pending{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:${T.amber};font-weight:600;background:${T.amberTint};padding:3px 10px;border-radius:20px;border:1px solid #FDE68A}
.ph-discharge-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;border:none;background:${T.primary};color:#fff;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .18s;box-shadow:0 2px 8px rgba(11,37,69,.22)}
.ph-discharge-btn:hover{background:${T.primaryDark};transform:translateY(-1px)}
.ph-empty{text-align:center;padding:48px 24px;color:${T.textMuted};font-size:14px}
.hist-page{padding:32px 44px 80px;animation:fadeUp .3s ease both}
.hist-page-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:24px;flex-wrap:wrap}
.hist-filter-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:${T.white};border:1px solid ${T.border};border-radius:14px;padding:14px 18px;margin-bottom:22px;box-shadow:${T.shadow}}
.hist-filter-label{font-size:12px;font-weight:700;color:${T.textMuted};text-transform:uppercase;letter-spacing:.07em;flex-shrink:0}
.hist-filter-ctrl{font-family:'DM Sans',sans-serif;font-size:13px;color:${T.text};background:${T.offwhite};border:1.5px solid ${T.border};border-radius:9px;padding:8px 12px;outline:none;transition:border-color .15s;cursor:pointer;appearance:none}
.hist-filter-ctrl:focus{border-color:${T.accentDeep};box-shadow:0 0 0 3px ${T.bgTint}}
.hist-filter-sep{width:1px;height:22px;background:${T.border};flex-shrink:0}
.hist-clear-btn{padding:7px 14px;border-radius:8px;border:1.5px solid ${T.border};background:transparent;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:600;color:${T.textMuted};cursor:pointer;transition:all .15s}
.hist-clear-btn:hover{border-color:${T.accentDeep};color:${T.accentDeep}}
.hist-summary-stats{display:flex;gap:12px;margin-bottom:20px}
.hist-stat{background:${T.white};border:1px solid ${T.border};border-radius:12px;padding:13px 18px;flex:1;box-shadow:${T.shadow}}
.hist-stat-num{font-family:'DM Serif Display',serif;font-size:22px;color:${T.primary};display:block;line-height:1}
.hist-stat-lbl{font-size:11px;color:${T.textMuted};font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-top:4px;display:block}
.hist-table-wrap{background:${T.white};border:1px solid ${T.border};border-radius:16px;overflow:hidden;box-shadow:${T.shadow}}
.hist-table{width:100%;border-collapse:collapse}
.hist-table thead tr{background:${T.primary}}
.hist-table th{padding:11px 16px;text-align:left;font-size:11px;font-weight:600;color:rgba(255,255,255,.75);text-transform:uppercase;letter-spacing:.06em;white-space:nowrap}
.hist-table tbody tr{border-bottom:1px solid ${T.border};transition:background .15s;cursor:pointer}
.hist-table tbody tr:last-child{border-bottom:none}
.hist-table tbody tr:hover{background:${T.bgTint}}
.hist-table td{padding:13px 16px;font-size:13.5px;color:${T.text};vertical-align:middle}
.hist-pt-name{font-weight:600;color:${T.primary};cursor:pointer}
.hist-pt-name:hover{text-decoration:underline;color:${T.accentDeep}}
.hist-pt-uhid{font-size:11.5px;color:${T.textMuted};margin-top:2px}
.hist-dod-val{font-size:12.5px;color:${T.green};font-weight:500;display:flex;align-items:center;gap:5px;margin-top:4px}
.hist-pending{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:${T.amber};font-weight:600;background:${T.amberTint};padding:3px 10px;border-radius:20px;border:1px solid #FDE68A}
.hist-discharge-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;border:none;background:${T.primary};color:#fff;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .18s;box-shadow:0 2px 8px rgba(11,37,69,.22)}
.hist-discharge-btn:hover{background:${T.primaryDark};transform:translateY(-1px)}
.hist-completed{font-size:12px;color:${T.textLight};font-style:italic}
.hist-btn{display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:600;color:#fff;transition:all .18s;white-space:nowrap}
.hist-btn:hover{background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.35)}
.sidebar-divider{height:1px;background:${T.border};margin:10px 18px 8px}
.sidebar-hist-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:all .18s ease;margin-bottom:3px;margin-top:2px}
.sidebar-hist-item:hover{background:${T.bgTint}}
.sidebar-hist-item.active{background:linear-gradient(135deg,${T.accentDeep},${T.primaryMid})}
.sidebar-hist-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:${T.bgTint};color:${T.textMuted};transition:all .18s}
.sidebar-hist-item:hover .sidebar-hist-icon{background:${T.bgTint2};color:${T.accentDeep}}
.sidebar-hist-item.active .sidebar-hist-icon{background:rgba(56,189,248,.18);color:${T.accent}}
.sidebar-hist-label{font-size:13.5px;font-weight:500;color:${T.textMid};transition:color .18s}
.sidebar-hist-item:hover .sidebar-hist-label{color:${T.primary}}
.sidebar-hist-item.active .sidebar-hist-label{color:#fff;font-weight:600}
.pdm-overlay{position:fixed;inset:0;background:rgba(11,37,69,.72);z-index:800;display:flex;align-items:flex-start;justify-content:center;padding:24px 20px;overflow-y:auto;animation:fadeIn .2s ease both}
.pdm-modal{background:${T.bgPage};border-radius:20px;width:100%;max-width:900px;box-shadow:0 20px 60px rgba(0,0,0,.3);animation:fadeUp .25s ease both;overflow:hidden}
.pdm-hd{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:${T.primary}}
.pdm-hd-left{display:flex;align-items:center;gap:12px}
.pdm-avatar{width:46px;height:46px;border-radius:50%;background:rgba(56,189,248,.18);border:2px solid rgba(56,189,248,.3);display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:18px;color:${T.accent};flex-shrink:0}
.pdm-hd-name{font-family:'DM Serif Display',serif;font-size:19px;color:#fff}
.pdm-hd-meta{font-size:12px;color:rgba(255,255,255,.45);margin-top:2px}
.pdm-close{width:34px;height:34px;border-radius:8px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.7);transition:all .15s}
.pdm-close:hover{background:rgba(255,255,255,.18);color:#fff}
.pdm-body{padding:22px 24px}
.pdm-section-title{font-size:10.5px;font-weight:700;color:${T.textLight};text-transform:uppercase;letter-spacing:.1em;display:flex;align-items:center;gap:8px;margin:20px 0 12px}
.pdm-section-title::after{content:'';flex:1;height:1px;background:${T.border}}
.pdm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:4px}
.pdm-item{background:${T.white};border:1px solid ${T.border};border-radius:10px;padding:11px 14px}
.pdm-item.hi{background:${T.bgTint};border-color:${T.borderHov}}
.pdm-lbl{font-size:10px;font-weight:700;color:${T.textLight};text-transform:uppercase;letter-spacing:.07em;margin-bottom:3px}
.pdm-val{font-size:13.5px;font-weight:500;color:${T.text}}
.pdm-adm-card{background:${T.white};border:1px solid ${T.border};border-radius:14px;overflow:hidden;margin-bottom:14px;box-shadow:${T.shadow}}
.pdm-adm-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:${T.offwhite};border-bottom:1px solid ${T.border};flex-wrap:wrap;gap:8px}
.pdm-adm-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.pdm-adm-body{padding:14px 16px}
.pdm-bill-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600}
.bill-yes{background:${T.greenTint};color:${T.green};border:1px solid ${T.greenBorder}}
.bill-no{background:${T.amberTint};color:${T.amber};border:1px solid #FDE68A}
.btn-row{display:flex;align-items:center;gap:12px;margin-top:8px;justify-content:flex-end}
.btn{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;padding:11px 26px;border-radius:10px;cursor:pointer;border:none;transition:all .18s ease;display:inline-flex;align-items:center;gap:8px}
.btn-ghost{background:${T.white};color:${T.textMid};border:1.5px solid ${T.border}}
.btn-ghost:hover{background:${T.offwhite};border-color:${T.borderHov};color:${T.primary}}
.btn-primary{background:${T.primary};color:#fff;box-shadow:0 4px 14px rgba(11,37,69,.28)}
.btn-primary:hover{background:${T.primaryDark};transform:translateY(-1px)}
.btn-accent{background:linear-gradient(135deg,${T.accentDeep},${T.primary});color:#fff;box-shadow:0 4px 16px rgba(14,165,233,.32)}
.btn-accent:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(14,165,233,.42)}
.btn-print{background:${T.primary};color:#fff;box-shadow:0 4px 14px rgba(11,37,69,.28)}
.btn-print:hover{background:${T.primaryDark};transform:translateY(-1px)}
.btn-sm{padding:8px 16px;font-size:13px;border-radius:8px}
.uhid-gen{text-align:center;padding:56px 32px 48px;animation:fadeUp .4s ease both}
.uhid-ring{width:86px;height:86px;border-radius:50%;background:${T.bgTint};border:2px solid ${T.accentLight};display:flex;align-items:center;justify-content:center;margin:0 auto 22px;animation:scaleIn .4s .1s ease both;color:${T.accentDeep}}
.uhid-big{font-family:'DM Serif Display',serif;font-size:34px;color:${T.primary};letter-spacing:.05em;margin-bottom:7px}
.uhid-gen-sub{font-size:14px;color:${T.textMuted};margin-bottom:26px}
.uhid-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:400px;margin:0 auto 30px;text-align:left}
.uhid-info-item{background:${T.bgTint};border:1px solid ${T.border};border-radius:10px;padding:12px 14px}
.uhid-info-lbl{font-size:11px;font-weight:600;color:${T.textMuted};text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px}
.uhid-info-val{font-size:14px;font-weight:600;color:${T.primary}}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
.stat-card{background:${T.white};border:1px solid ${T.border};border-radius:14px;padding:17px 18px;box-shadow:${T.shadow}}
.stat-lbl{font-size:11.5px;font-weight:600;color:${T.textMuted};text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
.stat-val{font-family:'DM Serif Display',serif;font-size:22px;color:${T.primary}}
.stat-sub{font-size:12px;color:${T.textLight};margin-top:3px}
@media(max-width:900px){.sidebar{width:200px}.form-page,.content-area,.empty-state{padding-left:24px;padding-right:24px}.search-hero{padding:32px 24px 0}.search-panel{padding:22px 24px 26px}}
@media(max-width:680px){.layout{flex-direction:column}.sidebar{width:100%;height:auto;position:relative;top:0;border-right:none;border-bottom:1px solid ${T.border}}.sidebar-top{display:flex;gap:6px;padding:12px;flex-wrap:nowrap;overflow-x:auto}.sidebar-section-label,.sidebar-bottom{display:none}.nav-item{flex-direction:column;gap:4px;padding:8px 10px;min-width:70px;text-align:center}.nav-label{font-size:11px}.nav-step-num{display:none}.g2,.g3,.detail-grid,.adm-info-row,.info-grid{grid-template-columns:1fr}.s2{grid-column:span 1}.search-input-group{flex-direction:column}.new-adm-banner{flex-direction:column;align-items:flex-start}.hero-stats{display:none}.stat-grid{grid-template-columns:1fr 1fr}.hdr{padding:0 16px}.loc-city{display:none}}
@media print{.no-print{display:none !important}body{background:#fff}.hdr,.layout{display:none}}
`;

const BLOOD_GRP=["A+","A−","B+","B−","O+","O−","AB+","AB−"];
const GENDERS=["Male","Female","Other"];
const MARITAL=["Single","Married","Divorced","Widowed"];
const DISC_ST=["Recovered","Referred","LAMA (Left Against Medical Advice)","Absconded","Expired","Transferred"];
const PAY_MODES=["Cash","UPI / QR code","Credit card","Debit card","Net banking","NEFT / RTGS","Cheque","Insurance (TPA)","Partial payment"];
const TPA_LIST=["Star Health","Care Insurance","ICICI Lombard","HDFC ERGO","Niva Bupa","United India","Oriental Insurance","New India Assurance"];
const TPA_CARD_TYPES=["ECHS","ESI / ESIC","FCI","Ayushman Bharat","Northern Railway"];
const SVC_TYPES=["Consultation","Procedure","Lab test","Radiology","Pharmacy","Room charge","ICU charge","OT charge","Nursing care","Physiotherapy","Diet / meal","Medical supplies","Blood bank","Anaesthesia"];
const DEPARTMENTS=["General Medicine","Surgery","Orthopaedics","Gynaecology","Paediatrics","Cardiology","ENT","Ophthalmology","Dermatology","Neurology","Urology","Psychiatry","Oncology","Emergency","ICU"];
const NAV_PAGES=[{id:"patient",label:"Patient Info",icon:"person"},{id:"discharge",label:"Discharge Details",icon:"bed"},{id:"services",label:"Service Charges",icon:"pulse"},{id:"summary",label:"Summary",icon:"receipt"}];

const blankPatient=()=>({patientName:"",guardianName:"",gender:"",dob:"",ageYY:"",ageMM:"",ageDD:"",bloodGroup:"",maritalStatus:"",phone:"",altPhone:"",email:"",address:"",remarks:"",allergies:"",tpa:"",tpaCard:"",tpaValidity:"",tpaCardType:"",tpaPanelCardNo:"",tpaPanelValidity:"",nationalId:""});
const blankDischarge=()=>({dischargeStatus:"",doa:"",dod:"",roomNo:"",bedNo:"",billDate:"",wardName:"",doctorName:"",diagnosis:"",department:""});
const blankBilling=()=>({discount:"",advance:"",paidNow:"",paymentMode:""});
const blankSvc=()=>({type:"",code:"",title:"",rate:"",qty:"1"});

const LOCATION_DB={
  laxmi:[
    {uhid:"UHID-4821903",patientName:"Rahul Sharma",guardianName:"Suresh Sharma",gender:"Male",dob:"1985-06-12",bloodGroup:"B+",maritalStatus:"Married",phone:"9876543210",altPhone:"",email:"rahul@email.com",address:"12, MG Road, New Delhi - 110001",nationalId:"XXXX-XXXX-9821",remarks:"",allergies:"Penicillin",tpa:"Star Health",tpaCard:"SH-8821",tpaValidity:"2026-12-31",ageYY:"39",ageMM:"8",ageDD:"2",admissions:[{admNo:1,date:"2024-09-10",dateTime:"2024-09-10T09:00",location:"Laxmi Nagar",discharge:{dischargeStatus:"Recovered",doa:"2024-09-10T09:00",dod:"2024-09-14T11:00",roomNo:"204",bedNo:"B-3",wardName:"General Ward",doctorName:"Dr. Priya Mehta",diagnosis:"Viral fever with dehydration",department:"General Medicine"},services:[{type:"Consultation",code:"C01",title:"Doctor Consultation",rate:"500",qty:"4"},{type:"Room charge",code:"R01",title:"General Ward Room",rate:"800",qty:"4"},{type:"Lab test",code:"L01",title:"CBC & LFT",rate:"1200",qty:"1"}],billing:{discount:"200",advance:"2000",paidNow:"2300",paymentMode:"UPI / QR code"}},{admNo:2,date:"2025-03-02",dateTime:"2025-03-02T10:30",location:"Laxmi Nagar",discharge:{dischargeStatus:"Recovered",doa:"2025-03-02T10:30",dod:"2025-03-05T09:00",roomNo:"208",bedNo:"C-1",wardName:"General Ward",doctorName:"Dr. Priya Mehta",diagnosis:"Acute gastroenteritis",department:"General Medicine"},services:[{type:"Consultation",code:"C01",title:"Doctor Consultation",rate:"500",qty:"2"},{type:"Lab test",code:"L02",title:"Stool culture",rate:"900",qty:"1"},{type:"Pharmacy",code:"P01",title:"Medications",rate:"1400",qty:"1"}],billing:{discount:"0",advance:"1000",paidNow:"1800",paymentMode:"Cash"}}]},
    {uhid:"UHID-7734521",patientName:"Priya Verma",guardianName:"Ravi Verma",gender:"Female",dob:"1992-03-24",bloodGroup:"A+",maritalStatus:"Married",phone:"9812345678",altPhone:"9011223344",email:"priya.v@email.com",address:"45, Civil Lines, Jaipur - 302006",nationalId:"YYYY-YYYY-4432",remarks:"Diabetic patient",allergies:"Sulfa drugs",tpa:"",tpaCard:"",tpaValidity:"",ageYY:"33",ageMM:"11",ageDD:"18",admissions:[{admNo:1,date:"2023-11-05",dateTime:"2023-11-05T08:00",location:"Laxmi Nagar",discharge:{dischargeStatus:"Recovered",doa:"2023-11-05T08:00",dod:"2023-11-09T10:00",roomNo:"102",bedNo:"A-1",wardName:"Female Ward",doctorName:"Dr. Anjali Singh",diagnosis:"Appendicitis — post-op recovery",department:"Surgery"},services:[{type:"OT charge",code:"OT01",title:"Appendectomy",rate:"15000",qty:"1"},{type:"Nursing care",code:"N01",title:"Post-op nursing",rate:"600",qty:"4"},{type:"Pharmacy",code:"P01",title:"Medications",rate:"2200",qty:"1"}],billing:{discount:"500",advance:"10000",paidNow:"7300",paymentMode:"Cash"}}]},
  ],
  raya:[
    {uhid:"UHID-9901234",patientName:"Amit Gupta",guardianName:"Rajesh Gupta",gender:"Male",dob:"1978-11-20",bloodGroup:"O+",maritalStatus:"Married",phone:"9988776655",altPhone:"",email:"amit.g@email.com",address:"7, Station Road, Raya - 281204",nationalId:"ZZZZ-ZZZZ-1122",remarks:"",allergies:"None",tpa:"",tpaCard:"",tpaValidity:"",ageYY:"46",ageMM:"3",ageDD:"18",admissions:[{admNo:1,date:"2025-01-15",dateTime:"2025-01-15T07:30",location:"Raya",discharge:{dischargeStatus:"Referred",doa:"2025-01-15T07:30",dod:"2025-01-17T14:00",roomNo:"05",bedNo:"A-2",wardName:"Male Ward",doctorName:"Dr. Suresh Kumar",diagnosis:"Chest pain — referred to cardiology",department:"Cardiology"},services:[{type:"Consultation",code:"C01",title:"Emergency Consultation",rate:"700",qty:"1"},{type:"Lab test",code:"L01",title:"ECG & Troponin",rate:"1800",qty:"1"},{type:"Room charge",code:"R01",title:"Ward Stay",rate:"500",qty:"2"}],billing:{discount:"0",advance:"1000",paidNow:"2000",paymentMode:"Cash"}}]},
  ],
};

function Ico({d,size=16,sw=1.75}){return(<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{(Array.isArray(d)?d:[d]).map((p,i)=><path key={i} d={p}/>)}</svg>);}
const IC={cross:["M12 2v4M12 18v4","M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83","M2 12h4M18 12h4","M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"],person:["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 3a4 4 0 100 8 4 4 0 000-8z"],phone:"M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 013.1 5.2 2 2 0 015.1 3h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2L9.1 11a16 16 0 006.9 6.9l1.4-1.4a2 2 0 012-.5c.9.3 1.9.6 2.9.7A2 2 0 0122 16.9z",file:["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8M16 17H8M10 9H8"],shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",bed:["M2 4v16","M2 8h18a2 2 0 012 2v10","M2 17h20","M6 8v9"],pulse:"M22 12h-4l-3 9L9 3l-3 9H2",wallet:["M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-4","M16 12a2 2 0 000 4h4v-4h-4z"],receipt:["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8M16 17H8M10 9H8"],plus:"M12 5v14M5 12h14",check:"M20 6L9 17l-5-5",trash:["M3 6h18","M19 6l-1 14H6L5 6","M10 11v6M14 11v6","M9 6V4h6v2"],dn:"M6 9l6 6 6-6",print:["M6 9V2h12v7","M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2","M6 14h12v8H6z"],lock:["M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z","M7 11V7a5 5 0 0110 0v4"],doctor:["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z","M9 22V12h6v10"],search:"M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z",newadm:["M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2","M9 7a4 4 0 100 8 4 4 0 000-8z","M19 8v6M22 11h-6"],id:["M2 9a3 3 0 013-3h14a3 3 0 013 3v9a3 3 0 01-3 3H5a3 3 0 01-3-3V9z","M8 12h.01M12 12h.01M16 12h.01"],x:"M18 6L6 18M6 6l12 12",history:"M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2",users:["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75","M9 7a4 4 0 100 8 4 4 0 000-8z"],mapPin:["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z","M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0"],dept:["M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z","M3 9h18","M9 21V9"],calendar:["M8 2v4M16 2v4","M3 7h18","M3 5a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V5z","M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01"],bill:["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M9 13h6M9 17h4"]};
const PAGE_ICONS={person:IC.person,bed:IC.bed,pulse:IC.pulse,receipt:IC.receipt};

const statusBadge=status=>{if(!status)return null;const s=status.toLowerCase();let cls="badge-default";if(s.includes("recover"))cls="badge-recovered";else if(s.includes("refer"))cls="badge-referred";else if(s.includes("lama")||s.includes("against"))cls="badge-lama";return <span className={`status-badge ${cls}`}>{status}</span>;};
const initials=name=>name?name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase():"?";
const fmtDT=dt=>{if(!dt)return "—";try{return new Date(dt).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:true});}catch{return dt;}};
const fmtDate=dt=>{if(!dt)return "—";try{return new Date(dt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});}catch{return dt;}};
const admTotal=svcs=>svcs.reduce((a,s)=>a+(parseFloat(s.rate)||0)*(parseInt(s.qty)||0),0);

function Field({label,req,err,children,style}){return(<div className="fld" style={style}>{label&&<label>{label}{req&&<span className="req">*</span>}</label>}{children}{err&&<span className="fld-err">{err}</span>}</div>);}
function Inp({label,req,err,type="text",...p}){return(<Field label={label} req={req} err={err}><input className={`ctrl${err?" err":""}`} type={type} {...p}/></Field>);}
function Sel({label,req,err,opts,placeholder,...p}){return(<Field label={label} req={req} err={err}><div className="sel-w"><select className={`ctrl${err?" err":""}`} {...p}><option value="">{placeholder||"Select"}</option>{opts.map(o=><option key={o.v||o} value={o.v||o}>{o.l||o}</option>)}</select><span className="sel-arr"><Ico d={IC.dn} size={13} sw={2.5}/></span></div></Field>);}
function Txta({label,req,rows=3,...p}){return(<Field label={label} req={req}><textarea className="ctrl" rows={rows} {...p}/></Field>);}
function Card({icon,title,subtitle,children,delay=0}){return(<div className="card" style={{animationDelay:`${delay}s`}}><div className="card-hd"><div className="card-ico"><Ico d={icon} size={16} sw={1.75}/></div><div><p className="card-ttl">{title}</p>{subtitle&&<p className="card-sub">{subtitle}</p>}</div></div><div className="card-bd">{children}</div></div>);}
function SvcRow({svc,i,onChange,onRemove}){const tot=((parseFloat(svc.rate)||0)*(parseInt(svc.qty)||0)).toFixed(2);const ch=k=>e=>onChange(i,k,e.target.value);return(<div className="svc-row"><div className="sc-w"><select className="sc" value={svc.type} onChange={ch("type")}><option value="">Type</option>{SVC_TYPES.map(t=><option key={t}>{t}</option>)}</select><span className="sc-a"><Ico d={IC.dn} size={11} sw={2.5}/></span></div><input className="sc" placeholder="Code" value={svc.code} onChange={ch("code")}/><input className="sc" placeholder="Description" value={svc.title} onChange={ch("title")}/><input className="sc" type="number" placeholder="Rate" min="0" value={svc.rate} onChange={ch("rate")}/><input className="sc" type="number" placeholder="Qty" min="1" value={svc.qty} onChange={ch("qty")}/><span className="svc-tot">₹{tot}</span><button className="svc-del" onClick={()=>onRemove(i)}><Ico d={IC.trash} size={13} sw={2}/></button></div>);}

function PatientsHistoryPage({db,locId,onBack,onDischarge,onViewPatient}){
  const loc=LOCATIONS.find(l=>l.id===locId);
  const [filterDate,setFilterDate]=useState("");
  const [filterMonth,setFilterMonth]=useState("");
  const [filterYear,setFilterYear]=useState("");

  // Flatten all admissions
  const allRows=db.flatMap(p=>p.admissions.map(adm=>({
    patientName:p.patientName,
    uhid:p.uhid,
    admNo:adm.admNo,
    doa:adm.discharge?.doa||adm.dateTime||"",
    dod:adm.discharge?.dod||"",
    status:adm.discharge?.dischargeStatus||"",
    billing:adm.billing||{},
    patientObj:p,
    admObj:adm
  }))).sort((a,b)=>new Date(b.doa)-new Date(a.doa));

  // Build year options from data
  const years=[...new Set(allRows.map(r=>r.doa?new Date(r.doa).getFullYear():"").filter(Boolean))].sort((a,b)=>b-a);
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

  // Apply filters
  const filtered=allRows.filter(r=>{
    if(!r.doa)return true;
    const d=new Date(r.doa);
    if(filterDate){const fd=new Date(filterDate);if(d.toDateString()!==fd.toDateString())return false;}
    if(filterMonth&&String(d.getMonth())!==filterMonth)return false;
    if(filterYear&&String(d.getFullYear())!==filterYear)return false;
    return true;
  });

  const totalAdm=filtered.length;
  const discharged=filtered.filter(r=>r.dod&&r.status).length;
  const pending=totalAdm-discharged;
  const billed=filtered.filter(r=>r.billing&&(r.billing.paidNow||r.billing.paymentMode)).length;

  const clearFilters=()=>{setFilterDate("");setFilterMonth("");setFilterYear("");};
  const hasFilter=filterDate||filterMonth||filterYear;

  return(
    <div className="hist-page">
      {/* Page header */}
      <div className="hist-page-hd">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
            <button className="btn btn-ghost btn-sm" onClick={onBack} style={{padding:"6px 14px",fontSize:13}}>
              <Ico d={IC.dn} size={13} sw={2.5} style={{transform:"rotate(90deg)"}}/> ← Back
            </button>
          </div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:T.primary,marginBottom:4}}>Patients History</h1>
          <p style={{fontSize:14,color:T.textMuted}}>{loc.name} Branch · All admissions record</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="hist-filter-bar">
        <span className="hist-filter-label"><Ico d={IC.calendar} size={13} sw={2}/> Filter by</span>
        <div className="hist-filter-sep"/>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <span style={{fontSize:10,fontWeight:700,color:T.textLight,textTransform:"uppercase",letterSpacing:".06em"}}>Date</span>
          <input type="date" className="hist-filter-ctrl" value={filterDate} onChange={e=>setFilterDate(e.target.value)} style={{width:150}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <span style={{fontSize:10,fontWeight:700,color:T.textLight,textTransform:"uppercase",letterSpacing:".06em"}}>Month</span>
          <select className="hist-filter-ctrl" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{width:140}}>
            <option value="">All Months</option>
            {months.map((m,i)=><option key={i} value={String(i)}>{m}</option>)}
          </select>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <span style={{fontSize:10,fontWeight:700,color:T.textLight,textTransform:"uppercase",letterSpacing:".06em"}}>Year</span>
          <select className="hist-filter-ctrl" value={filterYear} onChange={e=>setFilterYear(e.target.value)} style={{width:110}}>
            <option value="">All Years</option>
            {years.map(y=><option key={y} value={String(y)}>{y}</option>)}
          </select>
        </div>
        {hasFilter&&<button className="hist-clear-btn" onClick={clearFilters}>✕ Clear</button>}
        <span style={{marginLeft:"auto",fontSize:13,color:T.textMuted,fontWeight:500}}>{filtered.length} record{filtered.length!==1?"s":""} found</span>
      </div>

      {/* Summary stats */}
      <div className="hist-summary-stats">
        {[{l:"Total Admissions",v:totalAdm,c:T.primary},{l:"Discharged",v:discharged,c:T.green},{l:"Pending Discharge",v:pending,c:T.amber},{l:"Bills Generated",v:billed,c:T.accentDeep}].map(s=>(
          <div key={s.l} className="hist-stat">
            <span className="hist-stat-num" style={{color:s.c}}>{s.v}</span>
            <span className="hist-stat-lbl">{s.l}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"60px 0",color:T.textMuted,fontSize:14,background:T.white,borderRadius:16,border:`1px solid ${T.border}`}}>
          <Ico d={IC.search} size={32} sw={1.5}/><br/><br/>
          No admissions found{hasFilter?" for the selected filter.":"."}
          {hasFilter&&<><br/><button className="btn btn-ghost btn-sm" style={{marginTop:12}} onClick={clearFilters}>Clear Filters</button></>}
        </div>
      ):(
        <div className="hist-table-wrap">
          <table className="hist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Date of Admission</th>
                <th>Discharge Status</th>
                <th>Date of Discharge</th>
                <th>Bill</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r,i)=>{
                const isDischarge=r.dod&&r.status;
                const hasBill=r.billing&&(r.billing.paidNow||r.billing.paymentMode);
                return(
                  <tr key={i}>
                    <td style={{color:T.textMuted,fontSize:12,width:40}}>{i+1}</td>
                    <td>
                      <div className="hist-pt-name" onClick={()=>onViewPatient(r.patientObj)}>{r.patientName}</div>
                      <div className="hist-pt-uhid">{r.uhid} · Adm #{r.admNo}</div>
                    </td>
                    <td style={{fontSize:13,color:T.textMid,whiteSpace:"nowrap"}}>{fmtDT(r.doa)}</td>
                    <td>
                      {isDischarge
                        ? statusBadge(r.status)
                        : <span className="hist-pending"><Ico d={IC.pulse} size={11} sw={2.5}/> Pending</span>
                      }
                    </td>
                    <td>
                      {isDischarge
                        ? <div className="hist-dod-val"><Ico d={IC.check} size={11} sw={2.5}/>{fmtDT(r.dod)}</div>
                        : <span style={{fontSize:12,color:T.textLight}}>—</span>
                      }
                    </td>
                    <td>
                      <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,padding:"2px 10px",borderRadius:20,
                        background:hasBill?T.greenTint:T.amberTint,
                        color:hasBill?T.green:T.amber,
                        border:`1px solid ${hasBill?T.greenBorder:"#FDE68A"}`}}>
                        <Ico d={hasBill?IC.check:IC.pulse} size={10} sw={2.5}/>{hasBill?"Generated":"Pending"}
                      </span>
                    </td>
                    <td>
                      {!isDischarge
                        ? <button className="hist-discharge-btn" onClick={()=>onDischarge(r.patientObj,r.admObj)}><Ico d={IC.bed} size={13} sw={2}/>Discharge</button>
                        : <span className="hist-completed">Completed</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LiveDate(){
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),60000);return()=>clearInterval(t);},[]);
  const d=now.toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short",year:"numeric"});
  return(
    <div className="hdr-date">
      <span className="hdr-date-ico"><Ico d={IC.calendar} size={13} sw={2}/></span>
      {d}
    </div>
  );
}

function PatientDetailModal({patient,onClose,onDischarge}){
  const [tab,setTab]=useState("info");
  const hasBill=adm=>adm.billing&&(adm.billing.paidNow||adm.billing.paymentMode);
  return(
    <div className="pdm-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="pdm-modal">
        <div className="pdm-hd">
          <div className="pdm-hd-left">
            <div className="pdm-avatar">{initials(patient.patientName)}</div>
            <div>
              <div className="pdm-hd-name">{patient.patientName}</div>
              <div className="pdm-hd-meta">{patient.uhid} · {patient.gender} · {patient.bloodGroup} · {patient.phone}</div>
            </div>
          </div>
          <button className="pdm-close" onClick={onClose}><Ico d={IC.x} size={15} sw={2}/></button>
        </div>
        <div className="pdm-body">
          {/* Tab bar */}
          <div style={{display:"flex",gap:4,background:T.offwhite,borderRadius:12,padding:4,border:`1px solid ${T.border}`,width:"fit-content",marginBottom:20}}>
            {[{id:"info",label:"Registration",icon:IC.person},{id:"admissions",label:"Admissions & Discharge",icon:IC.bed},{id:"billing",label:"Billing",icon:IC.bill}].map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 16px",borderRadius:9,border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:tab===t.id?600:500,cursor:"pointer",transition:"all .18s",background:tab===t.id?T.primary:"transparent",color:tab===t.id?"#fff":T.textMuted,boxShadow:tab===t.id?"0 2px 8px rgba(11,37,69,.22)":"none"}}>
                <Ico d={t.icon} size={13} sw={2}/>{t.label}
              </button>
            ))}
          </div>

          {/* Registration tab */}
          {tab==="info"&&(
            <>
              <div className="pdm-section-title">Personal Details</div>
              <div className="pdm-grid">
                {[{l:"Patient Name",v:patient.patientName,hi:true},{l:"UHID",v:patient.uhid,hi:true},{l:"Guardian",v:patient.guardianName},{l:"Gender",v:patient.gender},{l:"Date of Birth",v:fmtDate(patient.dob)},{l:"Age",v:patient.ageYY?`${patient.ageYY}y ${patient.ageMM||0}m ${patient.ageDD||0}d`:""},{l:"Blood Group",v:patient.bloodGroup},{l:"Marital Status",v:patient.maritalStatus},{l:"National ID",v:patient.nationalId,hi:true}].map(({l,v,hi})=>(
                  <div key={l} className={`pdm-item${hi?" hi":""}`}><div className="pdm-lbl">{l}</div><div className="pdm-val">{v||"—"}</div></div>
                ))}
              </div>
              <div className="pdm-section-title">Contact</div>
              <div className="pdm-grid">
                {[{l:"Phone",v:patient.phone},{l:"Alternate",v:patient.altPhone||"—"},{l:"Email",v:patient.email},{l:"Address",v:patient.address}].map(({l,v})=>(
                  <div key={l} className="pdm-item" style={l==="Address"?{gridColumn:"span 3"}:{}}><div className="pdm-lbl">{l}</div><div className="pdm-val">{v||"—"}</div></div>
                ))}
              </div>
              {(patient.allergies||patient.remarks)&&<>
                <div className="pdm-section-title">Notes</div>
                <div className="pdm-grid">
                  {patient.remarks&&<div className="pdm-item" style={{gridColumn:"span 1.5"}}><div className="pdm-lbl">Remarks</div><div className="pdm-val">{patient.remarks}</div></div>}
                  {patient.allergies&&<div className="pdm-item" style={{gridColumn:"span 1.5"}}><div className="pdm-lbl">Allergies</div><div className="pdm-val">{patient.allergies}</div></div>}
                </div>
              </>}
              {patient.tpa&&<>
                <div className="pdm-section-title">TPA / Insurance</div>
                <div className="pdm-grid">
                  {[{l:"Panel",v:patient.tpa},{l:"Card Type",v:patient.tpaCardType||patient.tpaCard},{l:"Validity",v:fmtDate(patient.tpaValidity)}].map(({l,v})=>(
                    <div key={l} className="pdm-item"><div className="pdm-lbl">{l}</div><div className="pdm-val">{v||"—"}</div></div>
                  ))}
                </div>
              </>}
            </>
          )}

          {/* Admissions tab */}
          {tab==="admissions"&&(
            patient.admissions.length===0
              ?<div style={{textAlign:"center",padding:"40px 0",color:T.textMuted}}>No admissions recorded.</div>
              :[...patient.admissions].reverse().map((adm,i)=>{
                const isDischarged=adm.discharge?.dod&&adm.discharge?.dischargeStatus;
                return(
                  <div key={i} className="pdm-adm-card">
                    <div className="pdm-adm-hd">
                      <div className="pdm-adm-left">
                        <span style={{fontFamily:"'DM Serif Display',serif",fontSize:14,color:T.primary,fontWeight:600}}>Admission #{adm.admNo}</span>
                        <span className="adm-date">{fmtDT(adm.dateTime||adm.discharge?.doa)}</span>
                        {adm.discharge?.department&&<span className="adm-dept">{adm.discharge.department}</span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        {statusBadge(adm.discharge?.dischargeStatus)}
                        {!isDischarged&&<button className="ph-discharge-btn" onClick={()=>onDischarge(patient,adm)}><Ico d={IC.bed} size={12} sw={2}/>Discharge Now</button>}
                      </div>
                    </div>
                    <div className="pdm-adm-body">
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                        {[["Doctor",adm.discharge?.doctorName],["Ward",adm.discharge?.wardName],["Room/Bed",`${adm.discharge?.roomNo||"—"} / ${adm.discharge?.bedNo||"—"}`],["Admitted",fmtDT(adm.discharge?.doa)],["Discharged",adm.discharge?.dod?fmtDT(adm.discharge.dod):"Not yet"],["Diagnosis",adm.discharge?.diagnosis]].map(([l,v])=>(
                          <div key={l} className="pdm-item"><div className="pdm-lbl">{l}</div><div className="pdm-val">{v||"—"}</div></div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
          )}

          {/* Billing tab */}
          {tab==="billing"&&(
            patient.admissions.length===0
              ?<div style={{textAlign:"center",padding:"40px 0",color:T.textMuted}}>No billing records.</div>
              :[...patient.admissions].reverse().map((adm,i)=>{
                const billMade=hasBill(adm);
                const tot=admTotal(adm.services||[]);
                const disc=parseFloat(adm.billing?.discount)||0;
                const adv=parseFloat(adm.billing?.advance)||0;
                const paid=parseFloat(adm.billing?.paidNow)||0;
                const net=Math.max(0,tot-disc-adv-paid);
                return(
                  <div key={i} className="pdm-adm-card">
                    <div className="pdm-adm-hd">
                      <div className="pdm-adm-left">
                        <span style={{fontFamily:"'DM Serif Display',serif",fontSize:14,color:T.primary,fontWeight:600}}>Admission #{adm.admNo}</span>
                        <span className="adm-date">{fmtDate(adm.date||adm.discharge?.doa)}</span>
                      </div>
                      <span className={`pdm-bill-badge ${billMade?"bill-yes":"bill-no"}`}>
                        <Ico d={billMade?IC.check:IC.pulse} size={11} sw={2.5}/>
                        {billMade?"Bill Generated":"No Bill Yet"}
                      </span>
                    </div>
                    {billMade&&(
                      <div className="pdm-adm-body">
                        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>
                          {[["Gross Total",`₹${tot.toFixed(2)}`],["Discount",`₹${disc.toFixed(2)}`],["Advance",`₹${adv.toFixed(2)}`],["Net Payable",`₹${net.toFixed(2)}`]].map(([l,v])=>(
                            <div key={l} className={`pdm-item${l==="Net Payable"?" hi":""}`}><div className="pdm-lbl">{l}</div><div className="pdm-val">{v}</div></div>
                          ))}
                        </div>
                        {adm.billing?.paymentMode&&<div style={{fontSize:13,color:T.textMid}}><strong>Payment Mode:</strong> {adm.billing.paymentMode}</div>}
                        {(adm.services||[]).length>0&&<>
                          <div style={{fontSize:11,fontWeight:700,color:T.textLight,textTransform:"uppercase",letterSpacing:".07em",margin:"14px 0 8px"}}>Services</div>
                          {adm.services.map((s,si)=>(
                            <div key={si} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"5px 0",borderBottom:`1px solid ${T.border}`,color:T.textMid}}>
                              <span>{s.title||s.type} {s.code?`(${s.code})`:""} × {s.qty}</span>
                              <span style={{fontWeight:600}}>₹{((parseFloat(s.rate)||0)*(parseInt(s.qty)||0)).toFixed(2)}</span>
                            </div>
                          ))}
                        </>}
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}

function LocationSwitcher({locId,setLocId}){
  const [open,setOpen]=useState(false);
  const loc=LOCATIONS.find(l=>l.id===locId);
  return(<div className="loc-switcher"><button className="loc-btn" onClick={()=>setOpen(o=>!o)}><div className="loc-dot" style={{background:loc.color}}/><div><div className="loc-name">{loc.name}</div><div className="loc-city">{loc.city}</div></div><div className={`loc-chevron${open?" open":""}`}><Ico d={IC.dn} size={13} sw={2.5}/></div></button>{open&&(<><div style={{position:"fixed",inset:0,zIndex:400}} onClick={()=>setOpen(false)}/><div className="loc-dropdown"><div style={{padding:"10px 16px 8px",borderBottom:`1px solid ${T.border}`}}><div style={{fontSize:11,fontWeight:700,color:T.textLight,textTransform:"uppercase",letterSpacing:".08em",display:"flex",alignItems:"center",gap:6}}><Ico d={IC.mapPin} size={12} sw={2}/> Select Branch</div></div>{LOCATIONS.map(l=>(<div key={l.id} className={`loc-option${l.id===locId?" active":""}`} onClick={()=>{setLocId(l.id);setOpen(false);}}><div className="loc-opt-dot" style={{background:l.color}}/><div><div className="loc-opt-name">{l.name}</div><div className="loc-opt-city">Mathura, Uttar Pradesh</div></div>{l.id===locId&&<div className="loc-opt-check"><Ico d={IC.check} size={14} sw={2.5}/></div>}</div>))}</div></>)}</div>);
}

function SearchPage({db,locId,onNewAdmission,onNewPatient}){
  const [searchType,setSearchType]=useState("phone");
  const [query,setQuery]=useState("");
  const [searched,setSearched]=useState(false);
  const [result,setResult]=useState(null);
  const [activeTab,setActiveTab]=useState(0);
  const loc=LOCATIONS.find(l=>l.id===locId);
  const doSearch=()=>{if(!query.trim())return;const q=query.trim().toLowerCase();const found=db.find(p=>searchType==="phone"?p.phone===q||p.altPhone===q:p.nationalId.toLowerCase()===q);setResult(found||null);setSearched(true);setActiveTab(0);};
  const clear=()=>{setQuery("");setSearched(false);setResult(null);};
  return(<>
    <div className="search-hero">
      <div className="hero-top">
        <div>
          <h1 className="hero-title">Patient Registration</h1>
          <p className="hero-subtitle">Search for a returning patient or register a new one</p>
          <div className="hero-loc-badge"><div style={{width:8,height:8,borderRadius:"50%",background:loc.color}}/>{loc.name} Branch · Mathura</div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><span className="hero-stat-num">{db.length}</span><span className="hero-stat-lbl">Patients</span></div>
          <div className="hero-stat"><span className="hero-stat-num">{db.reduce((a,p)=>a+p.admissions.length,0)}</span><span className="hero-stat-lbl">Admissions</span></div>
        </div>
      </div>
      <div className="search-panel">
        <div className="search-panel-title"><div style={{width:34,height:34,borderRadius:9,background:T.bgTint,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.accentDeep,flexShrink:0}}><Ico d={IC.search} size={16} sw={2}/></div>Find Existing Patient</div>
        <p className="search-panel-sub">Search by phone or National ID to check if this patient has visited before</p>
        <div className="search-toggle">
          <button className={`tgl-btn${searchType==="phone"?" active":""}`} onClick={()=>{setSearchType("phone");clear();}}><Ico d={IC.phone} size={14} sw={2}/> Phone Number</button>
          <button className={`tgl-btn${searchType==="nationalId"?" active":""}`} onClick={()=>{setSearchType("nationalId");clear();}}><Ico d={IC.id} size={14} sw={2}/> National ID</button>
        </div>
        <div className="search-input-group">
          <div className="search-input-wrap">
            <span className="search-input-icon"><Ico d={searchType==="phone"?IC.phone:IC.id} size={16} sw={1.75}/></span>
            <input className="search-ctrl" placeholder={searchType==="phone"?"Enter 10-digit mobile number…":"Enter Aadhar / PAN / Passport No…"} value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()}/>
            {query&&<button className="search-clear" onClick={clear}><Ico d={IC.x} size={14} sw={2}/></button>}
          </div>
          <button className="search-btn" onClick={doSearch}><Ico d={IC.search} size={15} sw={2}/> Search</button>
          <button className="new-patient-btn" onClick={onNewPatient}><Ico d={IC.plus} size={15} sw={2.5}/> New Patient</button>
        </div>
      </div>
    </div>
    <div className="content-area">
      {searched&&result&&(<>
        <div className="result-found">
          <div className="result-found-hd">
            <div className="rf-left">
              <div className="rf-avatar">{initials(result.patientName)}</div>
              <div>
                <div className="rf-name">{result.patientName}</div>
                <div className="rf-meta">
                  <span className="rf-chip" style={{background:"rgba(255,255,255,.15)",borderColor:"rgba(255,255,255,.2)",color:"#fff",fontWeight:700}}>{result.uhid}</span>
                  <span className="rf-chip">{result.gender}</span>
                  <span className="rf-chip">{result.bloodGroup}</span>
                  <span className="rf-chip"><Ico d={IC.phone} size={11} sw={2}/>{result.phone}</span>
                  <span className="rf-chip"><Ico d={IC.history} size={11} sw={2}/>{result.admissions.length} admission{result.admissions.length!==1?"s":""}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{padding:"16px 24px",background:T.white,display:"flex",gap:10,flexWrap:"wrap"}}>
            {[["Phone",result.phone],["National ID",result.nationalId],["Address",result.address],["Allergies",result.allergies||"None"]].map(([l,v])=>(
              <div key={l} style={{background:T.offwhite,border:`1px solid ${T.border}`,borderRadius:9,padding:"9px 13px",minWidth:140}}>
                <div style={{fontSize:10,fontWeight:700,color:T.textLight,textTransform:"uppercase",letterSpacing:".07em",marginBottom:2}}>{l}</div>
                <div style={{fontSize:13,fontWeight:500,color:T.text}}>{v||"—"}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="new-adm-banner">
          <div className="nab-icon"><Ico d={IC.newadm} size={22} sw={1.75}/></div>
          <div className="nab-text" style={{flex:1}}><h3>New Admission — {result.patientName}</h3><p>Same UHID <strong style={{color:T.accentLight}}>{result.uhid}</strong> will be retained. A new admission entry will be added to their history.</p></div>
          <button className="nab-btn" onClick={()=>onNewAdmission(result)}><Ico d={IC.plus} size={16} sw={2.5}/> New Admission</button>
        </div>
      </>)}
      {searched&&!result&&(<div className="not-found"><div className="not-found-icon"><Ico d={IC.search} size={28} sw={1.5}/></div><h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:T.primary,marginBottom:8}}>No patient found</h3><p style={{fontSize:14,color:T.textMuted,marginBottom:28,maxWidth:340,margin:"0 auto 28px",lineHeight:1.6}}>No record matches <strong>"{query}"</strong> at this branch.</p><button className="btn btn-accent" style={{margin:"0 auto"}} onClick={onNewPatient}><Ico d={IC.plus} size={15} sw={2.5}/> Register New Patient</button></div>)}
      {!searched&&(
        <div className="info-grid">
          {[{icon:"🔍",bg:"#EFF6FF",title:"Search First",desc:"Always search by phone or National ID before registering — avoids duplicate records."},{icon:"📋",bg:"#F0FDF4",title:"Patients History",desc:"Use Patients History in the sidebar to view all admissions, discharge status and bills."},{icon:"⚡",bg:"#FFF7ED",title:"Same UHID",desc:"Returning patients keep their original UHID — only a new admission is added."}].map(c=>(<div className="info-card" key={c.title}><div className="info-card-icon" style={{background:c.bg}}>{c.icon}</div><div className="info-card-title">{c.title}</div><p className="info-card-desc">{c.desc}</p></div>))}
        </div>
      )}
    </div>
  </>);
}

function PatientFormPage({data,setData,onSubmit,errs,onBack}){
  const set=k=>e=>setData(p=>({...p,[k]:e.target.value}));

  // Auto-calculate age from DOB
  const handleDob=e=>{
    const dob=e.target.value;
    if(!dob){setData(p=>({...p,dob:"",ageYY:"",ageMM:"",ageDD:""}));return;}
    const today=new Date();const birth=new Date(dob);
    let yy=today.getFullYear()-birth.getFullYear();
    let mm=today.getMonth()-birth.getMonth();
    let dd=today.getDate()-birth.getDate();
    if(dd<0){mm--;dd+=new Date(today.getFullYear(),today.getMonth(),0).getDate();}
    if(mm<0){yy--;mm+=12;}
    setData(p=>({...p,dob,ageYY:String(yy),ageMM:String(mm),ageDD:String(dd)}));
  };

  return(<div className="form-page">
    <div className="page-hd"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}><div><h1>New Patient Registration</h1><p>Fill in all details to register and generate a UHID</p></div><button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Search</button></div></div>
    <Card icon={IC.person} title="Personal Details" subtitle="Core identity and demographic information" delay={0}>
      <div className="g2">
        <Inp label="Patient Name" req placeholder="Full legal name" value={data.patientName} onChange={set("patientName")} err={errs.patientName}/>
        <Inp label="Guardian Name" req placeholder="Guardian / relative's name" value={data.guardianName} onChange={set("guardianName")} err={errs.guardianName}/>
        <Sel label="Gender" req opts={GENDERS} placeholder="Select gender" value={data.gender} onChange={set("gender")} err={errs.gender}/>
        <Sel label="Marital Status" opts={MARITAL} placeholder="Select status" value={data.maritalStatus} onChange={set("maritalStatus")}/>
        <Sel label="Blood Group" opts={BLOOD_GRP} placeholder="Select blood group" value={data.bloodGroup} onChange={set("bloodGroup")}/>
        <Inp label="Date of Birth" type="date" value={data.dob} onChange={handleDob}/>
      </div>
      <div className="div-lbl mt">Age <span style={{fontSize:10,fontWeight:400,color:T.textLight,textTransform:"none",letterSpacing:0}}>(auto-filled from DOB)</span></div>
      <div className="g3">
        <Inp label="Years" placeholder="YY" type="number" value={data.ageYY} onChange={set("ageYY")}/>
        <Inp label="Months" placeholder="MM" type="number" value={data.ageMM} onChange={set("ageMM")}/>
        <Inp label="Days" placeholder="DD" type="number" value={data.ageDD} onChange={set("ageDD")}/>
      </div>
    </Card>
    <Card icon={IC.phone} title="Contact Information" subtitle="Phone, email and address" delay={0.04}>
      <div className="g2">
        <Inp label="Phone Number" req type="tel" placeholder="10-digit mobile" value={data.phone} onChange={set("phone")} err={errs.phone}/>
        <Inp label="Alternate Number" type="tel" placeholder="10-digit alternate" value={data.altPhone} onChange={set("altPhone")}/>
        <Inp label="Email Address" req type="email" placeholder="patient@email.com" value={data.email} onChange={set("email")} err={errs.email}/>
        <Inp label="National ID" req placeholder="Aadhar / PAN / Passport" value={data.nationalId} onChange={set("nationalId")} err={errs.nationalId}/>
        <div className="s2"><Field label="Residential Address" req err={errs.address}><textarea className={`ctrl${errs.address?" err":""}`} rows={2} placeholder="Full address with city, state and PIN code" value={data.address} onChange={set("address")}/></Field></div>
      </div>
    </Card>
    <Card icon={IC.file} title="Remarks & Allergies" subtitle="Additional notes for treating team" delay={0.08}>
      <div className="g2">
        <Txta label="Remarks / Notes" placeholder="Any additional notes…" value={data.remarks} onChange={set("remarks")} rows={3}/>
        <Txta label="Known Allergies" placeholder="Drug, food or other known allergies…" value={data.allergies} onChange={set("allergies")} rows={3}/>
      </div>
    </Card>
    <div className="g2">
      <Card icon={IC.shield} title="TPA Details" subtitle="Insurance panel — Optional" delay={0.12}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <Sel label="Insurance Panel (TPA)" opts={TPA_LIST} placeholder="Select panel" value={data.tpa} onChange={set("tpa")}/>
          <Inp label="Card No." placeholder="TPA card number" value={data.tpaCard} onChange={set("tpaCard")}/>
          <Inp label="Validity Date" type="date" value={data.tpaValidity} onChange={set("tpaValidity")}/>
        </div>
      </Card>
      <Card icon={IC.id} title="Panel Card" subtitle="Govt. / scheme card — Optional" delay={0.14}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <Sel label="Card Type" opts={TPA_CARD_TYPES} placeholder="Select card type" value={data.tpaCardType} onChange={set("tpaCardType")}/>
          <Inp label="Card No." placeholder="Panel card number" value={data.tpaPanelCardNo} onChange={set("tpaPanelCardNo")}/>
          <Inp label="Validity Date" type="date" value={data.tpaPanelValidity} onChange={set("tpaPanelValidity")}/>
        </div>
      </Card>
    </div>
    <div className="btn-row"><button className="btn btn-accent" onClick={onSubmit}><Ico d={IC.check} size={15} sw={2.5}/> Register &amp; Generate UHID</button></div>
  </div>);
}

function UHIDScreen({uhid,patient,isReturning,admNo,onContinue,onDashboard,onNewPatient}){
  return(<div className="uhid-gen">
    <div className="uhid-ring"><Ico d={IC.check} size={36} sw={2.5}/></div>
    <div style={{fontSize:12,fontWeight:600,color:T.textMuted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>{isReturning?`Admission #${admNo} Created`:"UHID Generated"}</div>
    <div className="uhid-big">{uhid}</div>
    <p className="uhid-gen-sub">{isReturning?"Returning patient — same UHID retained, new admission entry added.":"Patient registered successfully. You can now fill discharge and billing details."}</p>
    <div className="uhid-info-grid">{[["Patient Name",patient.patientName],["Gender",patient.gender],["Phone",patient.phone],["Blood Group",patient.bloodGroup]].map(([l,v])=>(<div className="uhid-info-item" key={l}><div className="uhid-info-lbl">{l}</div><div className="uhid-info-val">{v||"—"}</div></div>))}</div>
    <div className="btn-row" style={{justifyContent:"center",gap:12}}>
      <button className="btn btn-ghost" onClick={onDashboard}><Ico d={IC.search} size={15} sw={2}/> Back to Dashboard</button>
      <button className="btn btn-ghost" onClick={onNewPatient}><Ico d={IC.plus} size={15} sw={2.5}/> Add New Patient</button>
      <button className="btn btn-primary" onClick={onContinue}><Ico d={IC.bed} size={15} sw={2}/> Continue to Discharge →</button>
    </div>
  </div>);
}

function DischargePage({data,setData,onSave}){
  const set=k=>e=>setData(p=>({...p,[k]:e.target.value}));
  return(<div className="form-page">
    <div className="page-hd"><h1>Discharge Details</h1><p>Room allocation, dates, department and treating doctor</p></div>
    <Card icon={IC.bed} title="Admission & Discharge" subtitle="Dates, status and room details" delay={0}><div className="g2"><Sel label="Status on Discharge" req opts={DISC_ST} placeholder="Select status" value={data.dischargeStatus} onChange={set("dischargeStatus")}/><Inp label="Bill Date & Time" type="datetime-local" value={data.billDate} onChange={set("billDate")}/><Inp label="Date & Time of Admission (DOA)" req type="datetime-local" value={data.doa} onChange={set("doa")}/><Inp label="Date & Time of Discharge (DOD)" type="datetime-local" value={data.dod} onChange={set("dod")}/><Inp label="Room Number" placeholder="e.g. 204" value={data.roomNo} onChange={set("roomNo")}/><Inp label="Bed Number" placeholder="e.g. B-12" value={data.bedNo} onChange={set("bedNo")}/></div></Card>
    <Card icon={IC.dept} title="Clinical Information" subtitle="Department, ward, doctor and diagnosis" delay={0.05}><div className="g2"><Sel label="Department" req opts={DEPARTMENTS} placeholder="Select department" value={data.department} onChange={set("department")}/><Inp label="Ward Name" placeholder="e.g. General Ward, ICU" value={data.wardName} onChange={set("wardName")}/><Inp label="Treating Doctor" placeholder="Dr. Full Name" value={data.doctorName} onChange={set("doctorName")}/><div className="s2"><Txta label="Diagnosis / Condition" placeholder="Primary diagnosis or condition…" value={data.diagnosis} onChange={set("diagnosis")} rows={3}/></div></div></Card>
    <div className="btn-row"><button className="btn btn-accent" onClick={onSave}><Ico d={IC.check} size={15} sw={2.5}/> Save Discharge Details →</button></div>
  </div>);
}

function ServicesPage({svcs,setSvcs,billing,setBilling,onSave}){
  const addS=()=>setSvcs(s=>[...s,blankSvc()]);
  const remS=i=>setSvcs(s=>s.filter((_,x)=>x!==i));
  const updS=(i,k,v)=>setSvcs(s=>s.map((r,x)=>x===i?{...r,[k]:v}:r));
  const setB=k=>e=>setBilling(p=>({...p,[k]:e.target.value}));
  const total=svcs.reduce((a,s)=>a+(parseFloat(s.rate)||0)*(parseInt(s.qty)||0),0);
  const disc=parseFloat(billing.discount)||0;const adv=parseFloat(billing.advance)||0;const paid=parseFloat(billing.paidNow)||0;const net=Math.max(0,total-disc-adv-paid);
  return(<div className="form-page">
    <div className="page-hd"><h1>Service Charges</h1><p>Add all clinical and support services for this admission</p></div>
    <div className="stat-grid">{[{l:"Services",v:svcs.length,s:"added"},{l:"Gross Total",v:`₹${total.toFixed(2)}`,s:"before deductions"},{l:"Discount",v:`₹${disc.toFixed(2)}`,s:"applied"},{l:"Net Payable",v:`₹${net.toFixed(2)}`,s:"final"}].map(sc=>(<div className="stat-card" key={sc.l}><div className="stat-lbl">{sc.l}</div><div className="stat-val">{sc.v}</div><div className="stat-sub">{sc.s}</div></div>))}</div>
    <Card icon={IC.pulse} title="Services & Charges" subtitle="Add all services provided during the stay" delay={0}><div style={{overflowX:"auto"}}><div style={{minWidth:720}}><div className="svc-th">{["Service Type","Code","Description","Rate (₹)","Qty","Total",""].map((h,i)=><span key={i}>{h}</span>)}</div>{svcs.map((s,i)=><SvcRow key={i} svc={s} i={i} onChange={updS} onRemove={remS}/>)}</div></div><button className="add-svc" onClick={addS}><Ico d={IC.plus} size={15} sw={2.5}/> Add service line</button><div className="subtot"><span className="subtot-lbl">{svcs.length} item{svcs.length!==1?"s":""} · Subtotal</span><span className="subtot-val">₹{total.toFixed(2)}</span></div></Card>
    <Card icon={IC.wallet} title="Payment Details" subtitle="Discounts, advance payments and settlement" delay={0.05}><div className="g2"><Inp label="Discount Amount (₹)" placeholder="0.00" type="number" value={billing.discount} onChange={setB("discount")}/><Inp label="Advance Payment (₹)" placeholder="Amount received earlier" type="number" value={billing.advance} onChange={setB("advance")}/><Inp label="Amount Paid Now (₹)" placeholder="Amount paid at discharge" type="number" value={billing.paidNow} onChange={setB("paidNow")}/><Sel label="Payment Mode" req opts={PAY_MODES} placeholder="Select mode" value={billing.paymentMode} onChange={setB("paymentMode")}/></div></Card>
    <div className="btn-row"><button className="btn btn-accent" onClick={onSave}><Ico d={IC.check} size={15} sw={2.5}/> Save &amp; Go to Summary →</button></div>
  </div>);
}

function SummaryPage({uhid,patient,discharge,svcs,billing,locId,admNo,onPrint}){
  const total=svcs.reduce((a,s)=>a+(parseFloat(s.rate)||0)*(parseInt(s.qty)||0),0);
  const disc=parseFloat(billing.discount)||0;const adv=parseFloat(billing.advance)||0;const paid=parseFloat(billing.paidNow)||0;const net=Math.max(0,total-disc-adv-paid);
  const today=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
  const loc=LOCATIONS.find(l=>l.id===locId);
  return(<div className="form-page">
    <div className="page-hd-row"><div><h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:T.primary,marginBottom:5}}>Final Summary</h1><p style={{fontSize:14,color:T.textMuted}}>Review and generate the invoice for Admission #{admNo}</p></div><button className="btn btn-print" onClick={onPrint}><Ico d={IC.print} size={15} sw={2}/> Print Invoice</button></div>
    <Card icon={IC.person} title="Patient Information" delay={0}><div className="g2">{[["UHID",uhid],["Admission #",`#${admNo}`],["Patient Name",patient.patientName],["Guardian",patient.guardianName],["Gender",patient.gender],["Blood Group",patient.bloodGroup],["Phone",patient.phone],["National ID",patient.nationalId],["Branch",`${loc.name}, Mathura`],["Address",patient.address]].map(([l,v])=>(<div key={l}><div style={{fontSize:11,fontWeight:600,color:T.textMuted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:3}}>{l}</div><div style={{fontSize:14,fontWeight:500,color:T.text}}>{v||"—"}</div></div>))}</div></Card>
    <Card icon={IC.bed} title="Discharge Details" delay={0.04}><div className="g2">{[["Status",discharge.dischargeStatus],["Department",discharge.department],["Doctor",discharge.doctorName],["Ward",discharge.wardName],["Room/Bed",`${discharge.roomNo||"—"} / ${discharge.bedNo||"—"}`],["Admission",fmtDT(discharge.doa)],["Discharge",fmtDT(discharge.dod)],["Diagnosis",discharge.diagnosis]].map(([l,v])=>(<div key={l}><div style={{fontSize:11,fontWeight:600,color:T.textMuted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:3}}>{l}</div><div style={{fontSize:14,fontWeight:500,color:T.text}}>{v||"—"}</div></div>))}</div></Card>
    <div className="inv-card">
      <div className="inv-hd"><div className="inv-hd-ico"><Ico d={IC.receipt} size={17} sw={1.75}/></div><div><p className="inv-hd-ttl">Invoice — Admission #{admNo}</p><p className="inv-hd-sub">{svcs.length} service{svcs.length!==1?"s":""} · {today} · {loc.name}</p></div></div>
      <div className="inv-rows">{svcs.filter(s=>s.title||s.type).map((s,i)=>(<div className="inv-row" key={i}><span className="inv-lbl">{s.title||s.type} {s.code?`(${s.code})`:""}</span><span className="inv-val">₹{((parseFloat(s.rate)||0)*(parseInt(s.qty)||0)).toFixed(2)}</span></div>))}<div className="inv-row"><span className="inv-lbl" style={{fontWeight:600}}>Gross Total</span><span className="inv-val">₹{total.toFixed(2)}</span></div><div className="inv-row"><span className="inv-lbl">Discount</span><span className="inv-val">− ₹{disc.toFixed(2)}</span></div><div className="inv-row"><span className="inv-lbl">Advance Payment</span><span className="inv-val">− ₹{adv.toFixed(2)}</span></div><div className="inv-row"><span className="inv-lbl">Amount Paid Now</span><span className="inv-val">− ₹{paid.toFixed(2)}</span></div></div>
      <div className="inv-net"><span className="net-lbl">Net Payable Amount</span><span className="net-val">₹{net.toFixed(2)}</span></div>
    </div>
    {billing.paymentMode&&<div className="pay-pill"><Ico d={IC.wallet} size={13} sw={2}/> Payment via: <strong>{billing.paymentMode}</strong></div>}
    <div className="btn-row"><button className="btn btn-print" onClick={onPrint}><Ico d={IC.print} size={15} sw={2}/> Print Invoice</button></div>
  </div>);
}

function PrintModal({uhid,patient,discharge,svcs,billing,locId,admNo,onClose}){
  const total=svcs.reduce((a,s)=>a+(parseFloat(s.rate)||0)*(parseInt(s.qty)||0),0);
  const disc=parseFloat(billing.discount)||0;const adv=parseFloat(billing.advance)||0;const paid=parseFloat(billing.paidNow)||0;const net=Math.max(0,total-disc-adv-paid);
  const today=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
  const loc=LOCATIONS.find(l=>l.id===locId);
  return(<div style={{position:"fixed",inset:0,background:"rgba(11,37,69,.8)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"28px 20px",overflowY:"auto"}}>
    <div style={{background:"#fff",borderRadius:16,maxWidth:720,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,.35)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 22px",borderBottom:`1px solid ${T.border}`,background:T.offwhite,borderRadius:"16px 16px 0 0"}}><span style={{fontWeight:600,color:T.primary,fontSize:15}}>Invoice Preview — Admission #{admNo}</span><div style={{display:"flex",gap:10}}><button className="btn btn-print" onClick={()=>window.print()}><Ico d={IC.print} size={14} sw={2}/> Print</button><button className="btn btn-ghost" onClick={onClose}>✕ Close</button></div></div>
      <div style={{padding:"36px 42px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:26,paddingBottom:18,borderBottom:`2px solid ${T.primary}`}}><div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:T.primary,marginBottom:3}}>Sangi Hospital</div><div style={{fontSize:12,color:T.textMuted,display:"flex",alignItems:"center",gap:5}}><span style={{width:8,height:8,borderRadius:"50%",background:loc.color,display:"inline-block"}}/>{loc.name} Branch · Mathura, Uttar Pradesh</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.textMuted,textTransform:"uppercase",letterSpacing:".07em",marginBottom:2}}>UHID · Admission #{admNo}</div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:T.primary}}>{uhid}</div><div style={{fontSize:12,color:T.textMuted,marginTop:3}}>{today}</div></div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:24}}>{[{title:"Patient Details",rows:[["Name",patient.patientName],["Guardian",patient.guardianName],["Phone",patient.phone],["Blood Group",patient.bloodGroup]]},{title:"Admission Details",rows:[["Department",discharge.department],["Doctor",discharge.doctorName],["Room/Bed",`${discharge.roomNo||"—"}/${discharge.bedNo||"—"}`],["Status",discharge.dischargeStatus]]}].map(sec=>(<div key={sec.title} style={{background:T.bgTint,borderRadius:10,padding:"13px 15px"}}><div style={{fontSize:10.5,fontWeight:700,color:T.textMuted,textTransform:"uppercase",letterSpacing:".07em",marginBottom:9}}>{sec.title}</div>{sec.rows.map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}><span style={{color:T.textMuted}}>{l}</span><span style={{fontWeight:500,color:T.text}}>{v||"—"}</span></div>))}</div>))}</div>
        <table style={{width:"100%",borderCollapse:"collapse",marginBottom:18}}><thead><tr style={{background:T.primary}}>{["#","Service","Code","Rate","Qty","Amount"].map(h=><th key={h} style={{color:"#fff",padding:"9px 12px",textAlign:"left",fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}</tr></thead><tbody>{svcs.map((s,i)=><tr key={i} style={{background:i%2===0?"#fff":T.offwhite}}><td style={{padding:"9px 12px",fontSize:13,borderBottom:`1px solid ${T.border}`}}>{i+1}</td><td style={{padding:"9px 12px",fontSize:13,borderBottom:`1px solid ${T.border}`}}>{s.title||s.type||"—"}</td><td style={{padding:"9px 12px",fontSize:13,borderBottom:`1px solid ${T.border}`}}>{s.code||"—"}</td><td style={{padding:"9px 12px",fontSize:13,borderBottom:`1px solid ${T.border}`}}>₹{parseFloat(s.rate||0).toFixed(2)}</td><td style={{padding:"9px 12px",fontSize:13,borderBottom:`1px solid ${T.border}`}}>{s.qty||1}</td><td style={{padding:"9px 12px",fontSize:13,fontWeight:600,borderBottom:`1px solid ${T.border}`}}>₹{((parseFloat(s.rate)||0)*(parseInt(s.qty)||0)).toFixed(2)}</td></tr>)}</tbody></table>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:0,marginBottom:14}}>{[["Gross Total",`₹${total.toFixed(2)}`],["Discount",`− ₹${disc.toFixed(2)}`],["Advance",`− ₹${adv.toFixed(2)}`],["Paid Now",`− ₹${paid.toFixed(2)}`]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",width:250,padding:"6px 0",borderBottom:`1px solid ${T.border}`,fontSize:13}}><span style={{color:T.textMid}}>{l}</span><span style={{fontWeight:600}}>{v}</span></div>))}</div>
        <div style={{background:T.primary,borderRadius:10,padding:"15px 22px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:".1em"}}>Net Payable Amount</span><span style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:"#fff"}}>₹{net.toFixed(2)}</span></div>
        {billing.paymentMode&&<div style={{marginTop:10,fontSize:13,color:T.textMid,textAlign:"right"}}>Payment via: <strong style={{color:T.primary}}>{billing.paymentMode}</strong></div>}
        <div style={{marginTop:28,paddingTop:14,borderTop:`1px solid ${T.border}`,fontSize:11,color:T.textLight,textAlign:"center"}}>© 2026 Sangi Hospital — {loc.name}, Mathura · All rights reserved · Design &amp; Developed by IUI Solution</div>
      </div>
    </div>
  </div>);
}

export default function App(){
  const [locId,setLocId]=useState("laxmi");
  const [page,setPage]=useState("patient");
  const [subPage,setSubPage]=useState("search");
  const [uhid,setUhid]=useState(null);
  const [admNo,setAdmNo]=useState(1);
  const [showUHID,setShowUHID]=useState(false);
  const [isReturning,setIsReturning]=useState(false);
  const [patientDone,setPatientDone]=useState(false);
  const [dischargeDone,setDischargeDone]=useState(false);
  const [servicesDone,setServicesDone]=useState(false);
  const [showPrint,setShowPrint]=useState(false);
  const [showPatientDetail,setShowPatientDetail]=useState(null);
  const [patient,setPatient]=useState(blankPatient());
  const [discharge,setDischarge]=useState(blankDischarge());
  const [svcs,setSvcs]=useState([blankSvc()]);
  const [billing,setBilling]=useState(blankBilling());
  const [errs,setErrs]=useState({});
  const [db]=useState(JSON.parse(JSON.stringify(LOCATION_DB)));

  const currentDb=db[locId];

  const resetAll=()=>{setPage("patient");setSubPage("search");setUhid(null);setShowUHID(false);setPatientDone(false);setDischargeDone(false);setServicesDone(false);setPatient(blankPatient());setDischarge(blankDischarge());setSvcs([blankSvc()]);setBilling(blankBilling());setErrs({});};

  const switchLoc=id=>{setLocId(id);resetAll();setShowPatientDetail(null);};

  const handleNewAdmission=existing=>{const{admissions,...pd}=existing;setPatient(pd);setUhid(existing.uhid);setAdmNo(existing.admissions.length+1);setIsReturning(true);setShowUHID(true);};

  const handleDischargeFromHistory=(patientObj,admObj)=>{
    const{admissions,...pd}=patientObj;
    setPatient(pd);
    setUhid(patientObj.uhid);
    setAdmNo(admObj.admNo);
    setIsReturning(true);
    setDischarge({...blankDischarge(),...(admObj.discharge||{})});
    setSvcs(admObj.services&&admObj.services.length?admObj.services:[blankSvc()]);
    setBilling({...blankBilling(),...(admObj.billing||{})});
    setPatientDone(true);
    setDischargeDone(false);
    setServicesDone(false);
    setShowPatientDetail(null);
    setShowUHID(false);
    setPage("discharge");
  };

  const validatePatient=()=>{const e={};if(!patient.patientName.trim())e.patientName="Required";if(!patient.guardianName.trim())e.guardianName="Required";if(!patient.gender)e.gender="Required";if(!patient.phone||patient.phone.replace(/\D/g,"").length!==10)e.phone="Must be 10 digits";if(!patient.email||!patient.email.includes("@"))e.email="Valid email required";if(!patient.nationalId.trim())e.nationalId="Required";if(!patient.address.trim())e.address="Required";setErrs(e);return !Object.keys(e).length;};

  const handleRegister=()=>{if(!validatePatient())return;setUhid("UHID-"+Math.floor(1000000+Math.random()*9000000));setAdmNo(1);setIsReturning(false);setShowUHID(true);};
  const handleUHIDContinue=()=>{setPatientDone(true);setShowUHID(false);setPage("discharge");};
  const handleUHIDDashboard=()=>{setPatientDone(true);setShowUHID(false);setPage("patient");setSubPage("search");};
  const handleUHIDNewPatient=()=>{setPatientDone(false);setShowUHID(false);setPatient(blankPatient());setUhid(null);setDischarge(blankDischarge());setSvcs([blankSvc()]);setBilling(blankBilling());setErrs({});setPage("patient");setSubPage("form");};
  const handleSaveDischarge=()=>{setDischargeDone(true);setPage("services");};
  const handleSaveServices=()=>{setServicesDone(true);setPage("summary");};

  const canNav=id=>({patient:true,discharge:patientDone,services:patientDone&&dischargeDone,summary:patientDone&&dischargeDone&&servicesDone}[id]||false);
  const isDone=id=>({patient:patientDone,discharge:dischargeDone,services:servicesDone}[id]||false);
  const navTo=id=>{if(!canNav(id))return;setShowUHID(false);setPage(id);};

  return(<>
    <style dangerouslySetInnerHTML={{__html:CSS}}/>
    {showPrint&&<PrintModal uhid={uhid} patient={patient} discharge={discharge} svcs={svcs} billing={billing} locId={locId} admNo={admNo} onClose={()=>setShowPrint(false)}/>}
    {showPatientDetail&&<PatientDetailModal patient={showPatientDetail} onClose={()=>setShowPatientDetail(null)} onDischarge={handleDischargeFromHistory}/>}
    <header className="hdr">
      <div className="hdr-left"><div className="hdr-logo"><Ico d={IC.cross} size={18} sw={2}/></div><div><p className="hdr-name">Sangi Hospital</p><p className="hdr-sub">IPD Portal</p></div></div>
      <LocationSwitcher locId={locId} setLocId={switchLoc}/>
      <div className="hdr-right">
        {uhid&&<div className="hdr-uhid"><span className="hdr-uhid-label">UHID</span>{uhid}</div>}
        <LiveDate/>
      </div>
    </header>
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-section-label">Registration Steps</div>
          {NAV_PAGES.map((p,i)=>{
            const locked=!canNav(p.id);
            const active=page===p.id&&!showUHID;
            const done=isDone(p.id);
            return(
              <div key={p.id} className={`nav-item${active?" active":""}${done&&!active?" done":""}${locked?" locked":""}`} onClick={()=>navTo(p.id)}>
                <div className="nav-icon">{locked?<Ico d={IC.lock} size={15} sw={2}/>:<Ico d={PAGE_ICONS[p.icon]} size={15} sw={2}/>}</div>
                <span className="nav-label">{p.label}</span>
                <span className="nav-step-num">{done?<Ico d={IC.check} size={10} sw={2.5}/>:i+1}</span>
              </div>
            );
          })}

          <div className="sidebar-divider"/>
          <div className="sidebar-section-label" style={{marginTop:8}}>Records</div>

          <div className={`sidebar-hist-item${page==="history"?" active":""}`} onClick={()=>{setShowUHID(false);setPage("history");}}>
            <div className="sidebar-hist-icon"><Ico d={IC.users} size={15} sw={2}/></div>
            <span className="sidebar-hist-label">Patients History</span>
          </div>
        </div>
        {uhid&&(
          <div className="sidebar-bottom">
            <div className="uhid-card">
              <div className="uhid-card-label">Current UHID</div>
              <div className="uhid-card-val">{uhid}</div>
              <div className="uhid-card-sub">{patient.patientName||"Patient"}{admNo>1?` · Adm #${admNo}`:""}</div>
            </div>
          </div>
        )}
      </aside>
      <main className="main" key={page+showUHID+subPage+locId}>
        {page==="patient"&&!showUHID&&subPage==="search"&&<SearchPage db={currentDb} locId={locId} onNewAdmission={handleNewAdmission} onNewPatient={()=>setSubPage("form")}/>}
        {page==="patient"&&!showUHID&&subPage==="form"&&<PatientFormPage data={patient} setData={setPatient} onSubmit={handleRegister} errs={errs} onBack={()=>setSubPage("search")}/>}
        {page==="patient"&&showUHID&&<UHIDScreen uhid={uhid} patient={patient} isReturning={isReturning} admNo={admNo} onContinue={handleUHIDContinue} onDashboard={handleUHIDDashboard} onNewPatient={handleUHIDNewPatient}/>}
        {page==="discharge"&&<DischargePage data={discharge} setData={setDischarge} onSave={handleSaveDischarge}/>}
        {page==="services"&&<ServicesPage svcs={svcs} setSvcs={setSvcs} billing={billing} setBilling={setBilling} onSave={handleSaveServices}/>}
        {page==="summary"&&<SummaryPage uhid={uhid} patient={patient} discharge={discharge} svcs={svcs} billing={billing} locId={locId} admNo={admNo} onPrint={()=>setShowPrint(true)}/>}
        {page==="history"&&<PatientsHistoryPage db={currentDb} locId={locId} onBack={()=>setPage("patient")} onDischarge={handleDischargeFromHistory} onViewPatient={p=>setShowPatientDetail(p)}/>}
      </main>
    </div>
  </>);
}


