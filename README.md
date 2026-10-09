
<a name="0"></a>
## 0. Principles

These principles have been adapted from [idomatic.js style guide](https://github.com/rwaldron/idiomatic.js/).

<a name="0.1"></a>
### 0.1 If your UE5 project already has a style guide, you should follow it

If you are working on a project or with a team that has a pre-existing style guide, it should be respected.  Any inconsistency between an existing style guide and this guide should defer to the existing.

Style guides should be living documents. You should propose style guide changes to an existing style guide as well as this guide if you feel the change benefits all usages.

> #### "Arguments over style are pointless. There should be a style guide, and you should follow it."
> [_Rebecca Murphey_](https://rmurphey.com)

<a name="0.2"></a>
### 0.2 All structure, assets, and code in any Unreal Engine 5 project should look like a single person created it, no matter how many people contributed

Moving from one project to another should not cause a re-learning of style and structure. Conforming to a style guide removes unneeded guesswork and ambiguities.

It also allows for more productive creation and maintenance as one does not need to think about style. Simply follow the instructions. This style guide is written with best practices in mind, meaning that by following this style guide you will also minimize hard to track issues.

<a name="0.3"></a>
### 0.3 Friends do not let friends have bad style

If you see someone working either against a style guide or no style guide, try to correct them.

When working within a team or discussing within a community such as [Unreal Source](https://unrealsource.com/), it is far easier to help and to ask for help when people are consistent. Nobody likes to help untangle someone's Blueprint spaghetti or deal with assets that have names they can't understand.

If you are helping someone whose work conforms to a different but consistent and sane style guide, you should be able to adapt to it. If they do not conform to any style guide, please direct them here.

<a name="0.4"></a>
### 0.4 A team without a style guide is no team of mine

When joining an Unreal Engine 5 team, one of your first questions should be "Do you have a style guide?". If the answer is no, you should be skeptical about their ability to work as a team.

<a name="0.5"></a>
### 0.5 Don't Break The Law

This is not legal advice, but please don't introduce illegal actions and behavior to a project, including but not limited to:

* Don't distribute content you don't have the rights to distribute
* Don't infringe on someone else's copyrighted or trademark material
* Don't steal content
* Follow licensing restrictions on content, e.g. attribute when attributions are needed

<a name="1"></a>
## 1. Globally Enforced Opinions

<a name="1.1"></a>
### 1.1 Forbidden Characters

<a name="identifiers-1"></a>
#### Identifiers

In any `Identifier` of any kind, **never** use the following unless absolutely forced to:

* White space of any kind
* Backward slashes `\`
* Symbols i.e. `#!@$%`
* Any Unicode character

Any `Identifier` should strive to only have the following characters when possible (the RegEx `[A-Za-z0-9_]+`)

* ABCDEFGHIJKLMNOPQRSTUVWXYZ
* abcdefghijklmnopqrstuvwxyz
* 1234567890
* _ (sparingly)

The reasoning for this is this will ensure the greatest compatibility of all data across all platforms across all tools, and help prevent downtime due to potentially bad character handling for identifiers in code you don't control.

<a name="anc"></a>
<a name="2"></a>
## 2. Asset Naming Conventions

Naming conventions should be treated as law. A project that conforms to a naming convention is able to have its assets managed, searched, parsed, and maintained with incredible ease.

Most things are prefixed with prefixes being generally an acronym of the asset type followed by an underscore.

<a name="base-asset-name"></a>
<a name="2.1"></a>
### 2.1 Base Asset Name - `Prefix_BaseAssetName_Variant_Suffix`

All assets should have a _Base Asset Name_. A Base Asset Name represents a logical grouping of related assets. Any asset that is part of this logical group should follow the standard of  `Prefix_BaseAssetName_Variant_Suffix`.

Keeping the pattern `Prefix_BaseAssetName_Variant_Suffix` and in mind and using common sense is generally enough to warrant good asset names. Here are some detailed rules regarding each element.

`Prefix` and `Suffix` are to be determined by the asset type through the following [Asset Name Modifier](#asset-name-modifiers) tables.

`BaseAssetName` should be determined by a short and easily recognizable name related to the context of this group of assets. For example, if you had a character named Bob, all of Bob's assets would have the `BaseAssetName` of `Bob`.

For unique and specific variations of assets, `Variant` is either a short and easily recognizable name that represents logical grouping of assets that are a subset of an asset's base name. For example, if Bob had multiple skins these skins should still use `Bob` as the `BaseAssetName` but include a recognizable `Variant`. An 'Evil' skin would be referred to as `Bob_Evil` and a 'Retro' skin would be referred to as `Bob_Retro`.

For unique but generic variations of assets, `Variant` is a two digit number starting at `01`. For example, if you have an environment artist generating nondescript rocks, they would be named `Rock_01`, `Rock_02`, `Rock_03`, etc. Except for rare exceptions, you should never require a three digit variant number. If you have more than 100 assets, you should consider organizing them with different base names or using multiple variant names.

Depending on how your asset variants are made, you can chain together variant names. For example, if you are creating flooring assets for an Arch Viz project you should use the base name `Flooring` with chained variants such as `Flooring_Marble_01`, `Flooring_Maple_01`, `Flooring_Tile_Squares_01`.

<a name="2.1-examples"></a>
#### 2.1 Examples

##### 2.1e1 Bob

| Asset Type              | Asset Name                                                 |
| ----------------------- | ---------------------------------------------------------- |
| Skeletal Mesh           | SKM_Bob                                                    |
| Material                | M_Bob                                                      |
| Texture (Diffuse/Albedo)| T_Bob_D                                                    |
| Texture (Normal)        | T_Bob_N                                                    |
| Texture (Evil Diffuse)  | T_Bob_Evil_D                                               |

##### 2.1e2 Rocks

| Asset Type              | Asset Name                                                 |
| ----------------------- | ---------------------------------------------------------- |
| Static Mesh (01)        | SM_Rock_01                                                 |
| Static Mesh (02)        | SM_Rock_02                                                 |
| Static Mesh (03)        | SM_Rock_03                                                 |
| Material                | M_Rock                                                     |
| Material Instance (Snow)| MI_Rock_Snow                                               |

<a name="asset-name-modifiers"></a>
<a name="2.2"></a>
### 2.2 Asset Name Modifiers

When naming an asset, use these tables to determine the prefix and suffix to use with an asset's [Base Asset Name](#base-asset-name).

<a name="anc-common"></a>
<a name="2.2.1"></a>
#### 2.2.1 Most Common

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Level / Map             |            |            | [Should be in a folder called Maps.](#3.4.4) |
| Level (Main Component)  |            | _P         | Main authored component, not the glue level. |
| Level (Persistent)      |            |            | Composition root only; do not author content here. |
| Level (Audio)           |            | _Audio     |                                  |
| Level (Lighting)        |            | _Light     |                                  |
| Level (Geometry)        |            | _Geo       |                                  |
| Level (Gameplay)        |            | _Gameplay  |                                  |
| Blueprint               | BP_        |            |                                  |
| Material                | M_         |            |                                  |
| Static Mesh             | SM_        |            |                                  |
| Skeletal Mesh           | SKM_       |            |                                  |
| Texture                 | T_         | _?         | See [Textures](#anc-textures)    |
| Particle System         | PS_        |            |                                  |
| Niagara System          | NS_        |            |                                  |
| Widget Blueprint        | WBP_       |            |                                  |

<a name="anc-animations"></a>
<a name="2.2.2"></a>
#### 2.2.2 Animations

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Aim Offset              | AO_        |            |                                  |
| Aim Offset 1D           | AO_        |            |                                  |
| Animation Blueprint     | ABP_       |            |                                  |
| Animation Composite     | AC_        |            |                                  |
| Animation Montage       | AM_        |            |                                  |
| Animation Sequence      | A_         |            |                                  |
| Blend Space             | BS_        |            |                                  |
| Blend Space 1D          | BS_        |            |                                  |
| Level Sequence          | LS_        |            |                                  |
| Morph Target            | MT_        |            |                                  |
| Paper Flipbook          | PFB_       |            |                                  |
| Rig                     | Rig_       |            |                                  |
| Control Rig             | CR_        |            |                                  |
| IK Rig                  | IK_        |            |                                  |
| Skeletal Mesh           | SKM_       |            |                                  |
| Skeleton                | SK_        |            |                                  |

<a name="anc-ai"></a>
<a name="2.2.3"></a>
### 2.2.3 Artificial Intelligence

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| AI Controller           | AIC_       |            |                                  |
| Behavior Tree           | BT_        |            |                                  |
| Blackboard              | BB_        |            |                                  |
| Decorator               | BTD_       |            |                                  |
| Service                 | BTS_       |            |                                  |
| Task                    | BTT_       |            |                                  |
| Environment Query       | EQS_       |            |                                  |
| EnvQueryContext         | EQS_       | Context    |                                  |

<a name="anc-bp"></a>
<a name="2.2.4"></a>
### 2.2.4 Blueprints

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Blueprint               | BP_        |            |                                  |
| Blueprint Component     | BPC_       |            | I.e. BPC_InventoryComponent      |
| Blueprint Function Library | BPFL_   |            |                                  |
| Blueprint Interface     | BPI_       |            |                                  |
| Blueprint Macro Library | BPML_      |            | Do not use macro libraries if possible. |
| Enumeration             | E_         |            |                                  |
| Structure               | ST_        |            |                                  |
| Tutorial Blueprint      | TBP_       |            |                                  |
| Camera Shake            | CS_        |            |                                  |
| Anim Notify             | AN_        |            |                                  |
| Widget Blueprint        | WBP_       |            |                                  |
| Editor Utility Blueprint | EUB_      |            |                                  |
| Editor Utility Widget    | EUW_      |            |                                  |

<a name="anc-materials"></a>
<a name="2.2.5"></a>
### 2.2.5 Materials

| Asset Type                    | Prefix     | Suffix     | Notes                            |
| ----------------------------- | ---------- | ---------- | -------------------------------- |
| Material                      | M_         |            |                                  |
| Material (Post Process)       | M_, MI_    |            | `PP` is the post-processing modifier, placed right after the material's type (`M_PP_`, `MI_PP_`). Any material whose name carries `PP` that way lives in [`Art/PostProcess`](#3.4.1) and nowhere else. |
| Material Function             | MF_        |            |                                  |
| Material Instance             | MI_        |            |                                  |
| Material Parameter Collection | MPC_       |            |                                  |
| Subsurface Profile            | SP_        |            |                                  |
| Physical Materials            | PM_        |            |                                  |
| Decal                         | M_, MI_, T_ |            | The `Decal` token goes right after the type: `M_Decal_<Name>`, `MI_Decal_<Name>`, and `T_Decal_<Name>`. A deliberate exception to PascalCase, so a decal is named explicitly and cannot be misused. |

<a name="anc-textures"></a>
<a name="2.2.6"></a>
### 2.2.6 Textures

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Texture                 | T_         |            | A texture with no suffix is implied to be Diffuse/Albedo/Base Color. |
| Texture (Post Process)  | T_         |            | `PP` marks post-processing; lives in [`Art/PostProcess`](#3.4.1). |
| Texture (Diffuse/Albedo/Base Color)| T_ | _D / _BC | `_D` and `_BC` are interchangeable. |
| Texture (Normal)        | T_         | _N         |                                  |
| Texture (Roughness)     | T_         | _R         |                                  |
| Texture (Alpha/Opacity) | T_         | _A         |                                  |
| Texture (Ambient Occlusion) | T_     | _O         |                                  |
| Texture (Bump)          | T_         | _B         |                                  |
| Texture (Emissive)      | T_         | _E         |                                  |
| Texture (Mask)          | T_         | _Mask / _MSK | `_Mask` and `_MSK` are both allowed. |
| Texture (Specular)      | T_         | _S         |                                  |
| Texture (Metallic)      | T_         | _M         |                                  |
| Texture (Packed)        | T_         | _*         | See notes below about [packing](#anc-textures-packing). |
| Texture Cube            | TC_        |            |                                  |
| Media Texture           | MTX_       |            |                                  |
| Render Target           | RT_        |            |                                  |
| Cube Render Target      | RTC_       |            |                                  |
| Texture Light Profile   | TLP        |            |                                  |

<a name="anc-textures-packing"></a>
<a name="2.2.6.1"></a>
#### 2.2.6.1 Texture Packing
It is common practice to pack multiple layers of texture data into one texture. An example of this is packing Emissive, Roughness, Ambient Occlusion together as the Red, Green, and Blue channels of a texture respectively. To determine the suffix, simply stack the given suffix letters from above together, e.g. `_ERO`.

> It is generally acceptable to include an Alpha/Opacity layer in your Diffuse/Albedo's alpha channel and as this is common practice, adding `A` to the `_D` or `_BC` suffix is optional.

Packing 4 channels of data into a texture (RGBA) is not recommended except for an Alpha/Opacity mask in the Diffuse/Albedo's alpha channel as a texture with an alpha channel incurs more overhead than one without.

<a name="anc-misc"></a>
<a name="2.2.7"></a>
### 2.2.7 Miscellaneous

| Asset Type                 | Prefix     | Suffix     | Notes                            |
| -------------------------- | ---------- | ---------- | -------------------------------- |
| Animated Vector Field      | VFA_       |            |                                  |
| Camera Anim                | CA_        |            |                                  |
| Color Curve                | C_         | _Color     |                                  |
| Curve Table                | C_         | _Table     |                                  |
| Data Asset                 | DA_        |            |                                  |
| Primary Data Asset         | PDA_       |            |                                  |
| Data Table                 | DT_        |            |                                  |
| Input Action               | IA_        |            |                                  |
| Input Mapping Context      | IMC_       |            |                                  |
| Float Curve                | C_         | _Float     |                                  |
| Foliage Type               | FT_        |            |                                  |
| Force Feedback Effect      | FFE_       |            |                                  |
| Landscape Grass Type       | LG_        |            |                                  |
| Landscape Layer            | LL_        |            |                                  |
| Matinee Data               | Matinee_   |            |                                  |
| Media Player               | MP_        |            |                                  |
| File Media Source          | FMS_       |            |                                  |
| Object Library             | OL_        |            |                                  |
| PCG Graph                  | PCG_       |            | Procedural content generation.   |
| Redirector                 |            |            | These should be fixed up ASAP.   |
| Sprite Sheet               | SS_        |            |                                  |
| Static Vector Field        | VF_        |            |                                  |
| Substance Graph Instance   | SGI_       |            |                                  |
| Substance Instance Factory | SIF_       |            |                                  |
| Touch Interface Setup      | TI_        |            |                                  |
| Vector Curve               | C_         | _Vector    |                                  |

<a name="anc-paper2d"></a>
<a name="2.2.8"></a>
### 2.2.8 Paper 2D

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Paper Flipbook          | PFB_       |            |                                  |
| Sprite                  | SPR_       |            |                                  |
| Sprite Atlas Group      | SPRG_      |            |                                  |
| Tile Map                | TM_        |            |                                  |
| Tile Set                | TS_        |            |                                  |

<a name="anc-physics"></a>
<a name="2.2.9"></a>
### 2.2.9 Physics

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Physical Material       | PM_        |            |                                  |
| Physics Asset           | PA_        |            |                                  |
| Geometry Collection     | GC_        |            | Chaos destruction.               |
| Destructible Mesh       | DM_        |            |                                  |

<a name="anc-sounds"></a>
<a name="2.2.10"></a>
### 2.2.10 Sounds

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Dialogue Voice          | DV_        |            |                                  |
| Dialogue Wave           | DW_        |            |                                  |
| Media Sound Wave        | MSW_       |            |                                  |
| Reverb Effect           | Reverb_    |            |                                  |
| Sound Attenuation       | SA_        |            |                                  |
| Sound Class             | SC_        |            |                                  |
| Sound Concurrency       |            | _SC        | Should be named after a SoundClass |
| Sound Cue               | Cue_       |            |                                  |
| Sound Mix               | Mix_       |            |                                  |
| MetaSound Source        | MSS_       |            |                                  |
| MetaSound Patch         | MSP_       |            |                                  |
| Sound Wave              |            |            |                                  |

<a name="anc-ui"></a>
<a name="2.2.11"></a>
### 2.2.11 User Interface

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Font                    | F_         |            |                                  |
| Font Face               | FF_        |            |                                  |
| Slate Brush             | Brush_     |            |                                  |
| Slate Widget Style      | Style_     |            |                                  |
| Widget Blueprint        | WBP_       |            |                                  |

<a name="anc-effects"></a>
<a name="2.2.12"></a>
### 2.2.12 Effects

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Particle System         | PS_        |            |                                  |
| Niagara System          | NS_        |            | The placeable VFX asset.         |
| Niagara Emitter         | NE_        |            |                                  |
| Niagara Module Script   | NM_        |            |                                  |
| Niagara Parameter Collection | NP_   |            | Instances suffix `_I`.           |
| Material (Post Process) | M_, MI_    |            | `PP` is the post-processing modifier, placed right after the material's type (`M_PP_`, `MI_PP_`). Any material whose name carries `PP` that way lives in [`Art/PostProcess`](#3.4.1) and nowhere else. |

<a name="anc-gas"></a>
<a name="2.2.13"></a>
### 2.2.13 Gameplay Ability System

| Asset Type              | Prefix     | Suffix     | Notes                            |
| ----------------------- | ---------- | ---------- | -------------------------------- |
| Gameplay Ability        | GA_        |            |                                  |
| Gameplay Effect         | GE_        |            |                                  |
| Gameplay Cue Notify     | GCN_       |            |                                  |

<a name="3"></a>
<a name="structure"></a>
## 3. Content Directory Structure

Equally important as asset names, the directory structure style of a project should be considered law. Asset naming conventions and content directory structure go hand in hand, and a violation of either causes unneeded chaos.

All of a project's content lives under a folder named after the project (`Content/Haeretica`). Beneath that, the content is split into a fixed set of top-level folders, each a single, obvious home for one class of asset: `Art`, `Blueprint`, `FX`, `Maps`, `Prototype`, `SFX`, and `UI`. Because every asset already carries its type in its [prefix](#2.2), these folders group assets by _purpose_ rather than by raw asset type, and the Content Browser's filters and search are used to narrow down by type within a folder. Anyone on the team can then always find an asset's home without having to ask.

> Do not create a folder called `Assets`, and do not split a folder into sibling folders that are only distinguished by asset type (for example a `Meshes` folder next to a `Textures` folder). Name folders after the thing they contain, not the type of asset that happens to live there. The deliberate exceptions are [`Art/Materials`](#3.8) and [`Art/Textures`](#3.4.1): a `Materials` folder holding master materials, material functions, and generic material instances, and a `Textures` folder holding generic textures, are allowed. `UI/Fonts` is the third: fonts are a user-interface-only concept with no other home, so a `Fonts` folder is allowed in `UI` and nowhere else. A set that would otherwise be one large flat pile may add the same two folders for order, such as `Art/Environment/Materials` and `Art/Environment/Textures`, without splitting the set apart.

<a name="3e1"><a>
### 3e1 Example Project Content Structure
<pre>
|-- Content
    |-- <a href="#3.2">Haeretica</a>
        |-- <a href="#3.4.1">Art</a>
        |   |-- Characters
        |   |   |-- Mech
        |   |   |-- MeleeDummy
        |   |   |-- Player
        |   |   |-- Priestess
        |   |   |-- RangedDummy
        |   |   |-- Tank
        |   |-- Components
        |   |-- Decals
        |   |-- Environment
        |   |   |-- Materials
        |   |   |-- Textures
        |   |-- Interactables
        |   |-- <a href="#3.8">Materials</a>
        |   |   |-- MaterialInstances
        |   |   |-- MaterialFunctions
        |   |-- PostProcess
        |   |-- Textures
        |   |-- Tools
        |   |-- Weapons
        |-- <a href="#3.4.2">Blueprint</a>
        |   |-- Components
        |   |-- Enemies
        |   |-- GameModes
        |   |-- Interactables
        |   |-- Player
        |   |-- Tools
        |   |-- <a href="#3.6">Weapons</a>
        |-- <a href="#3.4.3">FX</a>
        |-- <a href="#3.4.4">Maps</a>
        |   |-- ArenaLevel1
        |   |-- Level1
        |   |-- Level2
        |   |-- Level3
        |   |-- MainMenu
        |   |-- TestLevels
        |-- <a href="#3.4.6">SFX</a>
        |   |-- Attenuation
        |   |-- Enemies
        |   |-- Music
        |-- <a href="#3.4.7">UI</a>
            |-- BaseElements
            |-- HUD
            |-- MainMenu
            |-- Options
            |-- Transition
</pre>

The reasons for this structure are listed in the following sub-sections.

<a name="3.1"></a>
<a name="structure-folder-names"><a>
### 3.1 Folder Names

PascalCase is the only naming standard in the project: every folder name and every asset base name uses it, and the rules below follow from that.

<a name="3.1.1"></a>
#### 3.1.1 Always Use PascalCase[<sup>*</sup>](#terms-cases)

PascalCase refers to starting a name with a capital letter and then instead of using spaces, every following word also starts with a capital letter. For example, `DesertEagle`, `RocketPistol`, and `ASeriesOfWords`.

See [Cases](#terms-cases).

<a name="3.1.2"></a>
#### 3.1.2 Never Use Spaces

Re-enforcing [3.1.1](#3.1.1), never use spaces. Spaces can cause various engineering tools and batch processes to fail. Ideally, your project's root also contains no spaces and is located somewhere such as `D:\Project` instead of `C:\Users\My Name\My Documents\Unreal Projects`.

<a name="3.1.3"></a>
#### 3.1.3 Never Use Unicode Characters And Other Symbols

If one of your game characters is named 'Zoë', its folder name should be `Zoe`. Unicode characters can be worse than [Spaces](#3.1.2) for engineering tool and some parts of UE5 don't support Unicode characters in paths either.

Related to this, if your project has unexplained issues and your computer's user name has a Unicode character (i.e. your name is `Zoë`), any project located in your `My Documents` folder will suffer from this issue. Often simply moving your project to something like `D:\Project` will fix these mysterious issues.

Using other characters outside `a-z`, `A-Z`, and `0-9` such as `@`, `-`, `_`, `,`, `*`, and `#` can also lead to unexpected and hard to track issues on other platforms, source control, and weaker engineering tools.

<a name="3.2"></a>
<a name="structure-top-level"><a>
### 3.2 Use A Top Level Folder For Project Specific Assets

All of a project's assets should exist in a folder named after the project. For example, if your project is named 'Haeretica', _all_ of it's content should exist in `Content/Haeretica`.

> The `Developers` folder is not for assets that your project relies on and therefore is not project specific. See [Developer Folders](#3.3) for details about this.

There are multiple reasons for this approach.

<a name="3.2.1"></a>
#### 3.2.1 No Global Assets

Often in code style guides it is written that you should not pollute the global namespace and this follows the same principle. When assets are allowed to exist outside of a project folder, it often becomes much harder to enforce a strict structure layout as assets not in a folder encourages the bad behavior of not having to organize assets.

Every asset should have a purpose, otherwise it does not belong in a project. If an asset is an experimental test and shouldn't be used by the project it should be put in a [`Developer`](#3.3) folder, which is personal and hidden by default; shared work-in-progress belongs in [`Prototype`](#3.4.5) instead.

<a name="3.2.2"></a>
#### 3.2.2 Reduce Migration Conflicts

When working on multiple projects it is common for a team to copy assets from one project to another if they have made something useful for both. When this occurs, the easiest way to perform the copy is to use the Content Browser's Migrate functionality as it will copy over not just the selected asset but all of its dependencies.

These dependencies are what can easily get you into trouble. If two project's assets do not have a top level folder and they happen to have similarly named or already previously migrated assets, a new migration can accidentally wipe any changes to the existing assets.

This is also the primary reason why Epic's Marketplace staff enforces the same policy for submitted assets.

After a migration, safe merging of assets can be done using the 'Replace References' tool in the content browser with the added clarity of assets not belonging to a project's top level folder are clearly pending a merge. Once assets are merged and fully migrated, there shouldn't be another top level folder in your Content tree. This method is _100%_ guaranteed to make any migrations that occur completely safe.

<a name="3.2.2e1"></a>
##### 3.2.2e1 Master Material Example

For example, say you created a master material in one project that you would like to use in another project so you migrated that asset over. If this asset is not in a top level folder, it may have a name like `Content/M_Master`. If the target project doesn't have a master material already, this should work without issue.

As work on one or both projects progress, their respective master materials may change to be tailored for their specific projects due to the course of normal development.

The issue comes when, for example, an artist for one project created a nice generic modular set of static meshes and someone wants to include that set of static meshes in the second project. If the artist who created the assets used material instances based on `Content/M_Master` as they're instructed to, when a migration is performed there is a great chance of conflict for the previously migrated `Content/M_Master` asset.

This issue can be hard to predict and hard to account for. The person migrating the static meshes may not be the same person who is familiar with the development of both project's master material, and they may not be even aware that the static meshes in question rely on material instances which then rely on the master material. The Migrate tool requires the entire chain of dependencies to work however, and so it will be forced to grab `Content/M_Master` when it copies these assets to the other project and it will overwrite the existing asset.

It is at this point where if the master materials for both projects are incompatible in _any way_, you risk breaking possibly the entire material library for a project as well as any other dependencies that may have already been migrated, simply because assets were not stored in a top level folder. The simple migration of static meshes now becomes a very ugly task.

<a name="3.2.3"></a>
#### 3.2.3 Samples, Templates, and Marketplace Content Are Risk-Free

An extension to [3.2.2](#3.2.2), if a team member decides to add sample content, template files, or assets they bought from the marketplace, it is guaranteed, as long your project's top-level folder is uniquely named,that these new assets will not interfere with your project.

You can not trust marketplace content to fully conform to the [top level folder rule](#3.2). There exists many assets that have the majority of their content in a top level folder but also have possibly modified Epic sample content as well as level files polluting the global `Content` folder.

When adhering to [3.2](#3.2), the worst marketplace conflict you can have is if two marketplace assets both have the same Epic sample content. If all your assets are in a project specific folder, including sample content you may have moved into your folder, your project will never break.

<a name="3.2.4"></a>
#### 3.2.4 DLC, Sub-Projects, and Patches Are Easily Maintained

If your project plans to release DLC or has multiple sub-projects associated with it that may either be migrated out or simply not cooked in a build, assets relating to these projects should have their own separate top level content folder. This make cooking DLC separate from main project content far easier. Sub-projects can also be migrated in and out with minimal effort. If you need to change a material of an asset or add some very specific asset override behavior in a patch, you can easily put these changes in a patch folder and work safely without the chance of breaking the core project.

<a name="3.3"></a>
<a name="structure-developers"></a>
### 3.3 Use Developers Folder For Local Testing

During a project's development, it is very common for team members to have a sort of 'sandbox' where they can experiment freely without risking the core project. Because this work may be ongoing, these team members may wish to put their assets on a project's source control server. Not all teams require use of Developer folders, but ones that do use them often run into a common problem with assets submitted to source control.

It is very easy for a team member to accidentally use assets that are not ready for use, which will cause issues once those assets are removed. For example, an artist may be iterating on a modular set of static meshes and still working on getting their sizing and grid snapping correct. If a world builder sees these assets in the main project folder, they might use them all over a level not knowing they could be subject to incredible change and/or removal. This causes massive amounts of re-working for everyone on the team to resolve.

If these modular assets were placed in a Developer folder, the world builder should never have had a reason to use them and the whole issue would never happen. The Content Browser has specific View Options that will hide Developer folders (they are hidden by default) making it impossible to accidentally use Developer assets under normal use.

Once the assets are ready for use, an artist simply has to move the assets into the project specific folder and fix up redirectors. This is essentially 'promoting' the assets from experimental to production.

<a name="3.4"></a>
<a name="structure-categories"></a>
### 3.4 Top Level Folders

Beneath the [project folder](#3.2), content is split into a fixed set of top-level folders. Each folder is a single, obvious home for one class of asset:

* `Art` - All visual assets, organized by kind. See [3.4.1](#3.4.1).
* `Blueprint` - The Blueprints that make up the project's logic. See [3.4.2](#3.4.2).
* `FX` - Niagara systems and the other assets that make up visual effects. See [3.4.3](#3.4.3).
* `Maps` - All [map](#terms-level-map) files. See [3.4.4](#3.4.4).
* `Prototype` - Throwaway or work-in-progress content that is not ready for the project proper. See [3.4.5](#3.4.5).
* `SFX` - Generic audio shared across the project: sound classes, attenuation presets, shared music. Audio tied to one asset lives with that asset. See [3.4.6](#3.4.6).
* `UI` - User interface assets: widget Blueprints, UI textures, and fonts. See [3.4.7](#3.4.7).

Not every project needs every folder. What matters is that when a folder exists, it is named and used exactly as described below, so its location is always predictable.

<a name="3.4.1"></a>
#### 3.4.1 Art

`Art` is the single home for the project's visual assets, grouped by kind:

* `Art/Characters` - Character art, with a sub-folder per character (`Art/Characters/Priestess`).
* `Art/Decals` - All decal materials, decal material instances, and their textures, such as bullet holes and blood decals.
* `Art/Environment` - A special folder, the one place a level designer looks for scenery: the environment meshes, kept flat at the root so no one has to dig for a prop, plus two sub-folders for order, `Art/Environment/Materials` (materials and their instances) and `Art/Environment/Textures` (the textures they use). Its `Materials` and `Textures` sub-folders are the same two folders any large flat set may add for order; see [3](#3). A placeable actor that is not scenery belongs to its own system instead: its Blueprint in `Blueprint/<System>`, its art in `Art/<System>`; see [3.4.2](#3.4.2).
* `Art/LUT` - Color lookup tables (LUTs) used for color grading.
* `Art/Materials` - Global master materials, at the root of the folder. A master that serves one asset set lives with that set instead. See [3.8](#3.8).
  * `Art/Materials/MaterialInstances` - Generic material instances used by several assets.
  * `Art/Materials/MaterialFunctions` - Reusable material functions.
* `Art/PhysicalMaterials` - [Physical materials](#2.2.9) used for surface responses such as footstep and impact effects.
* `Art/PostProcess` - Post-process materials and the textures they use, such as dither, outline, and blink effects. The `PP` name modifier marks post-processing ([`M_PP_`](#2.2.5), `MI_PP_`, `T_PP_`): any asset whose name carries `PP` belongs here and nowhere else.
* `Art/Textures` - Generic textures that are not tied to a specific asset: seamless textures, bricks, wood, and similar reusable material inputs. A texture that belongs to one specific asset, or is consumed by only one material instance, lives next to that asset in `Art`, not here.

A gameplay system whose art does not fit one of the folders above gets a matching folder here (for example `Art/Weapons`, `Art/Interactables`, `Art/Components`, or `Art/Tools`), mirroring that system's folder in `Blueprint`. A system is split the same way everywhere: its art and animation, everything about it that is not logic, lives here in `Art/<System>`, and its logic, the Blueprints and the data assets that support them, lives in `Blueprint/<System>`. An Animation Blueprint is animation, not logic, so it lives here too; see [3.4.2](#3.4.2).

<a name="3.4.2"></a>
#### 3.4.2 Blueprint

`Blueprint` holds the logic that makes up the project: the Blueprints and the data assets that support them, such as enumerations, structs, data tables, input actions, behavior trees, blackboards, and environment queries. It is not a home for a system's art or animation. Textures, materials, meshes, material instances, sounds, and Animation Blueprints (`ABP_`) live in [`Art`](#3.4.1) instead (or in the dedicated [`FX`](#3.4.3), [`SFX`](#3.4.6), and [`UI`](#3.4.7) folders), next to the asset they serve: an Animation Blueprint is animation, so it lives with the skeleton and meshes it drives, not here. Interactables follow the same split: `Blueprint/Interactables` holds every interactable Blueprint, and a level designer fetches the interactable Blueprint from there, while `Art/Interactables` holds the interactables' meshes, materials, and textures.

* `Blueprint/LevelActors` - Rarely needed: a Blueprint a designer drops into a level normally belongs to a system and lives in that system's folder (`Blueprint/<System>`); only a lone actor with no system of its own lands here.
* `Blueprint/Components` - Reusable actor components.
* `Blueprint/Enemies`, `Blueprint/Player`, `Blueprint/Weapons`, `Blueprint/Interactables`, `Blueprint/GameModes`, and `Blueprint/Tools` - One folder per gameplay system, holding all of the system's Blueprints. See [3.6](#3.6). The system's art and animation live in `Art/<System>`, so `Blueprint/Interactables` holds every interactable Blueprint while `Art/Interactables` keeps the meshes, materials, and textures they use.
* `Blueprint/UI` - UI logic: the non-widget UI Blueprints, such as HUD classes, plus UI data such as enumerations. Every UI Blueprint that is not a widget lives here; the widgets themselves are the UI and stay in [`UI`](#3.4.7).

<a name="3.4.3"></a>
#### 3.4.3 FX

`FX` holds visual effects: Niagara systems and emitters, the meshes and materials they rely on, and any other asset that only exists to serve a visual effect.

<a name="3.4.4"></a>
#### 3.4.4 Maps

Map files are incredibly special and it is common for every project to have its own map naming system, especially if they work with sub-levels or streaming levels. No matter what system of map organization is in place for the specific project, all levels should belong in `/Content/Haeretica/Maps`.

Being able to tell someone to open a specific map without having to explain where it is is a great time saver and general 'quality of life' improvement. It is common for levels to be within sub-folders of `Maps`, such as `Maps/Level1/` or `Maps/ArenaLevel1/`, but the most important thing here is that they all exist within `/Content/Haeretica/Maps`.

This also simplifies the job of cooking for engineers. Wrangling levels for a build process can be extremely frustrating if they have to dig through arbitrary folders for them. If a team's maps are all in one place, it is much harder to accidentally not cook a map in a build. It also simplifies lighting build scripts as well as QA processes.

A level folder may also contain a `_GENERATED` folder, either at the root of `Maps` or inside a level folder: this is the editor's own transient output. `_GENERATED` is off-limits: it is machine-generated, fair to delete and regenerate at any time, and none of the naming or structure rules in this guide apply to what is inside it, so do not rename, move, or otherwise tidy its contents.

<a name="3.4.5"></a>
#### 3.4.5 Prototype

`Prototype` is the shared counterpart to a personal [`Developer`](#3.3) folder: content that is experimental or being built out before it earns a permanent home lives here, such as greybox levels, test Blueprints, and rough assets. Work that is only your own scratch stays in a [`Developer`](#3.3) folder instead. Anything here is fair game to be deleted or heavily changed, and nothing in the shipped project should depend on it.

`Prototype` is the one and only exception to the [structure rules](#3): it is the single project folder allowed to hold temporary content, either because that content will be removed later or because it will be moved to the main project. Everywhere else, structure is law and an asset lives in its one permanent home.

Keeping prototype content in one place makes it obvious what is disposable and makes it trivial to strip before cooking a build. Once a prototype is ready for production, move it into its proper home and fix up redirectors.

<a name="3.4.6"></a>
#### 3.4.6 SFX

`SFX` holds only generic audio, shared across the project: shared sound classes, attenuation and concurrency presets, shared music, and any cue or wave used by more than one asset. It is not a home for every sound. Audio that belongs to a single asset lives with that asset, so the sound migrates as a unit with the thing it serves: a weapon's sounds live under [`Art/Weapons/<Weapon>`](#3.4.1), a character's under `Art/Characters/<Character>`, an interactive element's under `Art/Interactables/<System>`, and an effect's alongside that effect in [`FX`](#3.4.3). Cues and the waves, attenuations, and sound classes they use move together, so a set migrates as one. A class that serves a single asset lives with it, such as the player's `SC_Player` in `Art/Characters/Player`; only the shared classes stay here (`SC_Master`, `SC_Weapon`, `SC_Enemy`). The rest of `SFX` is grouped by kind, such as `Music`, `Attenuation`, or a shared `Enemies` set holding the hits and explosions that every enemy uses.

<a name="3.4.7"></a>
#### 3.4.7 UI

`UI` holds user interface assets: widget Blueprints, UI textures, UI materials (both masters and instances), and fonts. Group them by screen or element, such as `UI/HUD`, `UI/MainMenu`, or `UI/Options`, so a screen's widgets, textures, and materials migrate together: a crosshair material lives in `UI/HUD`, a button material in `UI/BaseElements`. UI assets carry the `UI` name modifier: `M_UI_` for materials, `MI_UI_` for instances, and `T_UI_` for textures. A weapon's HUD icon instance and its texture stay with the weapon in `Art/Weapons`, not here, even though the icon texture carries the `T_UI_` modifier. A generic weapon icon that names no single weapon, a placeholder or fallback, is a base element and lives in `UI/BaseElements`. Fonts are a UI-only concept with no home anywhere else, so `UI/Fonts` is the one type-named folder allowed inside `UI`. A non-widget UI Blueprint, such as a HUD class, is UI logic rather than UI itself and lives in [`Blueprint/UI`](#3.4.2) instead; only the widgets, their textures and materials, and the fonts stay in `UI`.


<a name="3.5"></a>
<a name="structure-base-classes"></a>
### 3.5 Keep Base Classes With Their System

There is no separate `Core` folder. A base class lives in its system's folder, next to the concrete Blueprints that inherit from it: a base `BP_WeaponBase` sits in `Blueprint/Weapons` beside `BP_Rifle`, a base pickup class sits in `Blueprint/Interactables` beside the specific health and ammo pickups, and base `GameMode`, `Character`, and `PlayerController` classes live in `Blueprint/GameModes` and `Blueprint/Player`. See [3.6](#3.6).

Base classes deserve a "don't touch these" reputation wherever they sit. Designers should make their gameplay tweaks in child classes that expose functionality, and world builders should use prefab Blueprints in designated folders, rather than editing a base class: a change there affects every child and can break the system project-wide.

When you add specific pickups, give each its own folder, such as `Blueprint/Interactables/Ammo/`, and leave the base class alone.

<a name="3.6"></a>
<a name="structure-systems"></a>
### 3.6 Give Every Blueprint System Its Own Folder

Within `Blueprint`, each gameplay system gets its own folder named after the system, holding all of the system's logic: every Blueprint, base classes, placeable actors, and interfaces alike, plus the data assets that support them. A system's art and animation live with the system in [`Art`](#3.4.1) instead, in the matching `Art/<System>` folder, so `Blueprint/Interactables` holds every interactable Blueprint and `Art/Interactables` holds its art and animation. Only logic belongs here: a system's meshes, textures, materials, sounds, and Animation Blueprints live in `Art`.

For example, a weapons system might look like this:

<pre>
|-- Blueprint
    |-- Weapons
        |-- BP_WeaponBase
        |-- BP_DesertEagle
        |-- BP_RocketPistol
        |-- BP_Rifle
</pre>

> Do not create a folder that is only named after an asset type (such as a `Meshes` or `SkeletalMeshes` folder) just to separate assets inside a system. The exceptions are the two folders [3](#3) allows: a `Materials` folder holding master materials, material functions, and generic instances, and a `Textures` folder holding the set's textures, as in `Art/Environment/Materials` and `Art/Environment/Textures`. Asset names already carry their type via their [prefix](#2.2) and the Content Browser can filter by type, so such folders only add redundant path segments. Want to see every static mesh under `Art/Environment/`? Turn on the Static Mesh filter. If assets are named correctly they sort alphabetically regardless of prefix.

<a name="3.7"></a>
<a name="structure-large-sets"></a>
### 3.7 Very Large Asset Sets Get Their Own Folder Layout

This can be seen as a pseudo-exception to [3.4](#3.4), where folders are normally named after the subject they contain.

There are certain asset types that have a huge volume of related files where each asset has a unique purpose. The two most common are Animation and Audio assets. If you find yourself having 15+ of these assets that belong together, they should be together.

For example, animations that are shared across multiple characters should live together in a shared `Animations` folder, with sub-folders such as `Locomotion` or `Cinematic`, rather than being duplicated per character.

> This does not apply to assets like textures and materials. It is common for a `Rocks` folder to have a large amount of textures if there are a large amount of rocks, however these textures are generally only related to a few specific rocks and should be named appropriately. Even if these textures are part of a [shared material](#3.8).

<a name="3.8"></a>
<a name="structure-materials"></a>
### 3.8 `Art/Materials`

If your project makes use of master materials, layered materials, or any form of reusable material or texture that does not belong to any subset of assets, these assets should be located in `Content/Haeretica/Art/Materials`.

This way all 'global' materials have a place to live and are easily located.

> This also makes it incredibly easy to enforce a 'use material instances only' policy within a project. If all artists and assets should be using material instances, then the only regular material assets that exist are the global masters here and the one-asset-set masters that live with their art. You can easily verify this by searching for base materials in any folder other than `Art/Materials` and the `Art` and `FX` set folders.

`Art/Materials` holds master materials at its root, a `MaterialInstances` sub-folder for generic instances used by several assets, and a `MaterialFunctions` sub-folder for reusable functions. Only global materials live here: a master shared by several asset sets, a master that feeds a generic instance, or one with no single art folder of its own. A master material that serves one asset set lives with that set instead: in [`Art/Environment`](#3.4.1), `Art/Weapons/<Weapon>`, `Art/Characters/<Character>`, `Art/Interactables/<System>`, or alongside the effect in `FX`. An instance that belongs to one asset set is likewise not stored here: it lives with that set, next to the mesh it is applied to, while one shared by several assets is generic and stays in `MaterialInstances`. Shared textures have their own folder: see [`Art/Textures`](#3.4.1). Post-process materials have their own folder: see [`Art/PostProcess`](#3.4.1). This folder is for generic, non-UI materials only: a UI material never lives here, it lives with its screen, see [3.4.7](#3.4.7).

There is no separate debug folder: a testing or debug material simply lives in `Art/Materials` like any other generic master, because that folder already holds exactly this kind of reusable, non-production-specific material. A `Debug` sub-folder would just duplicate a place the folder already provides.

<a name="3.9"></a>
<a name="structure-no-empty-folders"></a>
### 3.9 No Stray Empty Folders

There shouldn't be stray empty folders; they clutter the content browser. The structural folders named in [3.4](#3.4) are the exception, though: it's fine to create one ahead of content, such as `Art/LUT` or `Art/PhysicalMaterials` before the project has any LUT or physical material assets.

If you find that the content browser has an empty folder you can't delete, you should perform the following:
1. Be sure you're using source control.
1. Immediately run Fix Up Redirectors on your project.
1. Navigate to the folder on-disk and delete the assets inside.
1. Close the editor.
1. Make sure your source control state is in sync (i.e. if using Perforce, run a Reconcile Offline Work on your content directory)
1. Open the editor. Confirm everything still works as expected. If it doesn't, revert, figure out what went wrong, and try again.
1. Ensure the folder is now gone.
1. Submit changes to source control.


<a name="4"></a>
<a name="bp"></a>
## 4. Blueprints

This section will focus on Blueprint classes and their internals. When possible, style rules conform to [Epic's Coding Standard](https://dev.epicgames.com/documentation/en-us/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine).

Remember: Blueprinting badly bears blunders, beware! (Phrase by [KorkuVeren](http://github.com/KorkuVeren))

<a name="4.1"></a>
<a name="bp-compiling"></a>
### 4.1 Compiling

All blueprints should compile with zero warnings and zero errors. You should fix blueprint warnings and errors immediately as they can quickly cascade into very scary unexpected behavior.

Do *not* submit broken blueprints to source control. If you must store them on source control, shelve them instead.

Broken blueprints can cause problems that manifest in other ways, such as broken references, unexpected behavior, cooking failures, and frequent unneeded recompilation. A broken blueprint has the power to break your entire game.

<a name="4.2"></a>
<a name="bp-vars"></a>
### 4.2 Variables

The words `variable` and `property` may be used interchangeably.

<a name="4.2.1"></a>
<a name="bp-var-naming"></a>
#### 4.2.1 Naming

<a name="4.2.1.1"></a>
<a name="bp-var-naming-nouns"></a>
##### 4.2.1.1 Nouns

All non-boolean variable names must be clear, unambiguous, and descriptive nouns.

<a name="4.2.1.2"></a>
<a name="bp-var-naming-case"></a>
##### 4.2.1.2 PascalCase

All non-boolean variables should be in the form of [PascalCase](#terms-cases).

<a name="4.2.1.2e"></a>
###### 4.2.1.2e Examples

* `Score`
* `Kills`
* `TargetPlayer`
* `Range`
* `CrosshairColor`
* `AbilityID`

<a name="4.2.1.3"></a>
<a name="bp-var-bool-prefix"></a>
##### 4.2.1.3 Boolean `b` Prefix

All booleans should be named in PascalCase but prefixed with a lowercase `b`.

Example: Use `bDead` and `bEvil`, **not** `Dead` and `Evil`.

UE5 Blueprint editors know not to include the `b` in user-friendly displays of the variable.

<a name="4.2.1.4"></a>
<a name="bp-var-bool-names"></a>
##### 4.2.1.4 Boolean Names

<a name="4.2.1.4.1"></a>
###### 4.2.1.4.1 General And Independent State Information

All booleans should be named as descriptive adjectives when possible if representing general information. Do not include words that phrase the variable as a question, such as `Is`. This is reserved for functions.

Example: Use `bDead` and `bHostile` **not** `bIsDead` and `bIsHostile`.

Try to not use verbs such as `bRunning`. Verbs tend to lead to complex states.

<a name="4.2.1.4.2"></a>
###### 4.2.1.4.2 Complex States

Do not to use booleans to represent complex and/or dependent states. This makes state adding and removing complex and no longer easily readable. Use an enumeration instead.

Example: When defining a weapon, do **not** use `bReloading` and `bEquipping` if a weapon can't be both reloading and equipping. Define an enumeration named `EWeaponState` and use a variable with this type named `WeaponState` instead. This makes it far easier to add new states to weapons.

Example: Do **not** use `bRunning` if you also need `bWalking` or `bSprinting`. This should be defined as an enumeration with clearly defined state names.

<a name="4.2.1.5"></a>
<a name="bp-vars-naming-context"></a>
##### 4.2.1.5 Considered Context

All variable names must not be redundant with their context as all variable references in Blueprint will always have context.

<a name="4.2.1.5e"></a>
###### 4.2.1.5e Examples

Consider a Blueprint called `BP_PlayerCharacter`.

**Bad**

* `PlayerScore`
* `PlayerKills`
* `MyTargetPlayer`
* `MyCharacterName`
* `CharacterSkills`
* `ChosenCharacterSkin`

All of these variables are named redundantly. It is implied that the variable is representative of the `BP_PlayerCharacter` it belongs to because it is `BP_PlayerCharacter` that is defining these variables.

**Good**

* `Score`
* `Kills`
* `TargetPlayer`
* `Name`
* `Skills`
* `Skin`

<a name="4.2.1.6"></a>
<a name="bp-vars-naming-atomic"></a>
##### 4.2.1.6 Do _Not_ Include Atomic Type Names

Atomic or primitive variables are variables that represent data in their simplest form, such as booleans, integers, floats, and enumerations.

Strings and vectors are considered atomic in terms of style when working with Blueprints, however they are technically not atomic.

> While vectors consist of three floats, vectors are often able to be manipulated as a whole, same with rotators.

> Do _not_ consider Text variables as atomic, they are secretly hiding localization functionality. The atomic type of a string of characters is `String`, not `Text`.

Atomic variables should not have their type name in their name.

Example: Use `Score`, `Kills`, and `Description` **not** `ScoreFloat`, `FloatKills`, `DescriptionString`.

The only exception to this rule is when a variable represents 'a number of' something to be counted _and_ when using a name without a variable type is not easy to read.

Example: A fence generator needs to generate X number of posts. Store X in `NumPosts` or `PostsCount` instead of `Posts` as `Posts` may potentially read as an Array of a variable type named `Post`.

<a name="4.2.1.7"></a>
<a name="bp-vars-naming-complex"></a>
##### 4.2.1.7 Do Include Non-Atomic Type Names

Non-atomic or complex variables are variables that represent data as a collection of atomic variables. Structs, Classes, Interfaces, and primitives with hidden behavior such as `Text` and `Name` all qualify under this rule.

> While an Array of an atomic variable type is a list of variables, Arrays do not change the 'atomicness' of a variable type.

These variables should include their type name while still considering their context.

If a class owns an instance of a complex variable, i.e. if a `BP_PlayerCharacter` owns a `BP_Hat`, it should be stored as the variable type as without any name modifications.

Example: Use `Hat`, `Flag`, and `Ability` **not** `MyHat`, `MyFlag`, and `PlayerAbility`.

If a class does not own the value a complex variable represents, you should use a noun along with the variable type.

Example: If a `BP_Turret` has the ability to target a `BP_PlayerCharacter`, it should store its target as `TargetPlayer` as when in the context of `BP_Turret` it should be clear that it is a reference to another complex variable type that it does not own.


<a name="4.2.1.8"></a>
<a name="bp-vars-naming-arrays"></a>
##### 4.2.1.8 Arrays

Arrays follow the same naming rules as above, but should be named as a plural noun.

Example: Use `Targets`, `Hats`, and `EnemyPlayers`, **not** `TargetList`, `HatArray`, `EnemyPlayerArray`.


<a name="4.2.2"></a>
<a name="bp-vars-editable"></a>
#### 4.2.2 Editable Variables

All variables that are safe to change the value of in order to configure behavior of a blueprint should be marked as `Editable`.

Conversely, all variables that are not safe to change or should not be exposed to designers should _not_ be marked as editable, unless for engineering reasons the variable must be marked as `Expose On Spawn`.

Do not arbitrarily mark variables as `Editable`.

<a name="4.2.2.1"></a>
<a name="bp-vars-editable-tooltips"></a>
##### 4.2.2.1 Tooltips

All `Editable` variables, including those marked editable just so they can be marked as `Expose On Spawn`, should have a description in their `Tooltip` fields that explains how changing this value affects the behavior of the blueprint.

<a name="4.2.2.2"></a>
<a name="bp-vars-editable-ranges"></a>
##### 4.2.2.2 Slider And Value Ranges

All `Editable` variables should make use of slider and value ranges if there is ever a value that a variable should _not_ be set to.

Example: A blueprint that generates fence posts might have an editable variable named `PostsCount` and a value of -1 would not make any sense. Use the range fields to mark 0 as a minimum.

If an editable variable is used in a Construction Script, it should have a reasonable Slider Range defined so that someone can not accidentally assign it a large value that could crash the editor.

A Value Range only needs to be defined if the bounds of a value are known. While a Slider Range prevents accidental large number inputs, an undefined Value Range allows a user to specify a value outside the Slider Range that may be considered 'dangerous' but still valid.

<a name="4.2.3"></a>
<a name="bp-vars-categories"></a>
#### 4.2.3 Categories

If a class has only a small number of variables, categories are not required.

If a class has a moderate amount of variables (5-10), all `Editable` variables should have a non-default category assigned. A common category is `Config`.

If a class has a large amount of variables, all `Editable` variables should be categorized into sub-categories using the category `Config` as the base category. Non-editable variables should be categorized into descriptive categories describing their usage.

> You can define sub-categories by using the pipe character `|`, i.e. `Config | Animations`.

Example: A weapon class set of variables might be organized as:

    |-- Config
    |    |-- Animations
    |    |-- Effects
    |    |-- Audio
    |    |-- Recoil
    |    |-- Timings
    |-- Animations
    |-- State
    |-- Visuals

<a name="4.2.4"></a>
<a name="bp-vars-access"></a>
#### 4.2.4 Variable Access Level

In C++, variables have a concept of access level. Public means any code outside the class can access the variable. Protected means only the class and any child classes can access this variable internally. Private means only this class and no child classes can access this variable.

Blueprints do not have a defined concept of protected access currently.

Treat `Editable` variables as public variables. Treat non-editable variables as protected variables.

<a name="4.2.4.1"></a>
<a name="bp-vars-access-private"></a>
##### 4.2.4.1 Private Variables

Unless it is known that a variable should only be accessed within the class it is defined and never a child class, do not mark variables as private. Until variables are able to be marked `protected`, reserve private for when you absolutely know you want to restrict child class usage.

<a name="4.2.5"></a>
<a name="bp-vars-advanced"></a>
#### 4.2.5 Advanced Display

If a variable should be editable but often untouched, mark it as `Advanced Display`. This makes the variable hidden unless the advanced display arrow is clicked.

To find the `Advanced Display` option, it is listed as an advanced displayed variable in the variable details list.

<a name="4.2.6"></a>
<a name="bp-vars-transient"></a>
#### 4.2.6 Transient Variables

Transient variables are variables that do not need to have their value saved and loaded and have an initial value of zero or null. This is useful for references to other objects and actors who's value isn't known until run-time. This prevents the editor from ever saving a reference to it, and speeds up saving and loading of the blueprint class.

Because of this, all transient variables should always be initialized as zero or null. To do otherwise would result in hard to debug errors.

<a name="4.2.7"></a>
<a name="bp-vars-config"></a>
#### 4.2.8 Config Variables

Do not use the `Config Variable` flag. This makes it harder for designers to control blueprint behavior. Config variables should only be used in C++ for rarely changed variables. Think of them as `Advanced Advanced Display` variables.

<a name="4.3"></a>
<a name="bp-functions"></a>
### 4.3 Functions, Events, and Event Dispatchers

This section describes how you should author functions, events, and event dispatchers. Everything that applies to functions also applies to events, unless otherwise noted.

<a name="4.3.1"></a>
<a name="bp-funcs-naming"></a>
#### 4.3.1 Function Naming

The naming of functions, events, and event dispatchers is critically important. Based on the name alone, certain assumptions can be made about functions. For example:

* Is it a pure function?
* Is it fetching state information?
* Is it a handler?
* Is it an RPC?
* What is its purpose?

These questions and more can all be answered when functions are named appropriately.

<a name="4.3.1.1"></a>
<a name="bp-funcs-naming-verbs"></a>
#### 4.3.1.1 All Functions Should Be Verbs

All functions and events perform some form of action, whether its getting info, calculating data, or causing something to explode. Therefore, all functions should all start with verbs. They should be worded in the present tense whenever possible. They should also have some context as to what they are doing.

`OnRep` functions, event handlers, and event dispatchers are an exception to this rule.

Good examples:

* `Fire` - Good example if in a Character / Weapon class, as it has context. Bad if in a Barrel / Grass / any ambiguous class.
* `Jump` - Good example if in a Character class, otherwise, needs context.
* `Explode`
* `ReceiveMessage`
* `SortPlayerArray`
* `GetArmOffset`
* `GetCoordinates`
* `UpdateTransforms`
* `EnableBigHeadMode`
* `IsEnemy` - ["Is" is a verb.](http://writingexplained.org/is-is-a-verb)

Bad examples:

* `Dead` - Is Dead? Will deaden?
* `Rock`
* `ProcessData` - Ambiguous, these words mean nothing.
* `PlayerState` - Nouns are ambiguous.
* `Color` - Verb with no context, or ambiguous noun.

<a name="4.3.1.2"></a>
<a name="bp-funcs-naming-onrep"></a>
#### 4.3.1.2 Property RepNotify Functions Always `OnRep_Variable`

All functions for replicated with notification variables should have the form `OnRep_Variable`. This is forced by the Blueprint editor. If you are writing a C++ `OnRep` function however, it should also follow this convention when exposing it to Blueprints.

<a name="4.3.1.3"></a>
<a name="bp-funcs-naming-bool"></a>
#### 4.3.1.3 Info Functions Returning Bool Should Ask Questions

When writing a function that does not change the state of or modify any object and is purely for getting information, state, or computing a yes/no value, it should ask a question. This should also follow [the verb rule](#bp-funcs-naming-verbs).

This is extremely important as if a question is not asked, it may be assumed that the function performs an action and is returning whether that action succeeded.

Good examples:

* `IsDead`
* `IsOnFire`
* `IsAlive`
* `IsSpeaking`
* `IsHavingAnExistentialCrisis`
* `IsVisible`
* `HasWeapon` - ["Has" is a verb.](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html)
* `WasCharging` - ["Was" is past-tense of "be".](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html) Use "was" when referring to 'previous frame' or 'previous state'.
* `CanReload` - ["Can" is a verb.](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html)

Bad examples:

* `Fire` - Is on fire? Will fire? Do fire?
* `OnFire` - Can be confused with event dispatcher for firing.
* `Dead` - Is dead? Will deaden?
* `Visibility` - Is visible? Set visibility? A description of flying conditions?

<a name="4.3.1.4"></a>
<a name="bp-funcs-naming-eventhandlers"></a>
#### 4.3.1.4 Event Handlers and Dispatchers Should Start With `On`

Any function that handles an event or dispatches an event should start with `On` and continue to follow [the verb rule](#bp-funcs-naming-verbs). The verb may move to the end however if past-tense reads better.

[Collocations](http://dictionary.cambridge.org/us/grammar/british-grammar/about-words-clauses-and-sentences/collocation) of the word `On` are exempt from following the verb rule.

`Handle` is not allowed. It is 'Unreal' to use `On` instead of `Handle`, while other frameworks may prefer to use `Handle` instead of `On`.

Good examples:

* `OnDeath` - Common collocation in games
* `OnPickup`
* `OnReceiveMessage`
* `OnMessageRecieved`
* `OnTargetChanged`
* `OnClick`
* `OnLeave`

Bad examples:

* `OnData`
* `OnTarget`
* `HandleMessage`
* `HandleDeath`

<a name="4.3.1.5"></a>
<a name="bp-funcs-naming-rpcs"></a>
#### 4.3.1.5 Remote Procedure Calls Should Be Prefixed With Target

Any time an RPC is created, it should be prefixed with either `Server`, `Client`, or `Multicast`. No exceptions.

After the prefix, follow all other rules regarding function naming.

Good examples:

* `ServerFireWeapon`
* `ClientNotifyDeath`
* `MulticastSpawnTracerEffect`

Bad examples:

* `FireWeapon` - Does not indicate its an RPC of some kind.
* `ServerClientBroadcast` - Confusing.
* `AllNotifyDeath` - Use `Multicast`, never `All`.
* `ClientWeapon` - No verb, ambiguous.


<a name="4.3.2"></a>
<a name="bp-funcs-return"></a>
#### 4.3.2 All Functions Must Have Return Nodes

All functions must have return nodes, no exceptions.

Return nodes explicitly note that a function has finished its execution. In a world where blueprints can be filled with `Sequence`, `ForLoopWithBreak`, and backwards reroute nodes, explicit execution flow is important for readability, maintenance, and easier debugging.

The Blueprint compiler is able to follow the flow of execution and will warn you if there is a branch of your code with an unhandled return or bad flow if you use return nodes.

In situations like where a programmer may add a pin to a Sequence node or add logic after a for loop completes but the loop iteration might return early, this can often result in an accidental error in code flow. The warnings the Blueprint compiler will alert everyone of these issues immediately.

<a name="4.3.3"></a>
<a name="bp-graphs-funcs-node-limit"></a>
#### 4.3.3 No Function Should Have More Than 50 Nodes

Simply, no function should have more than 50 nodes. Any function this big should be broken down into smaller functions for readability and ease of maintenance.

The following nodes are not counted as they are deemed to not increase function complexity:

* Comment
* Route
* Cast
* Getting a Variable
* Breaking a Struct
* Function Entry
* Self

<a name="4.3.4"></a>
<a name="bp-graphs-funcs-description"></a>
#### 4.3.4 All Public Functions Should Have A Description

This rule applies more to public facing or marketplace blueprints, so that others can more easily navigate and consume your blueprint API.

Simply, any function that has an access specificer of Public should have its description filled out.

<a name="4.3.5"></a>
<a name="bp-graphs-funcs-plugin-category"></a>
#### 4.3.5 All Custom Static Plugin `BlueprintCallable` Functions Must Be Categorized By Plugin Name

If your project includes a plugin that defines `static` `BlueprintCallable` functions, they should have their category set to the plugin's name or a subset category of the plugin's name.

For example, `Zed Camera Interface` or `Zed Camera Interface | Image Capturing`.

<a name="4.4"></a>
<a name="bp-graphs"></a>
### 4.4 Blueprint Graphs

This section covers things that apply to all Blueprint graphs.

<a name="4.4.1"></a>
<a name="bp-graphs-spaghetti"></a>
#### 4.4.1 No Spaghetti

Wires should have clear beginnings and ends. You should never have to mentally untangle wires to make sense of a graph. Many of the following sections are dedicated to reducing spaghetti.

<a name="4.4.2"></a>
<a name="bp-graphs-align-wires"></a>
#### 4.4.2 Align Wires Not Nodes

Always align wires, not nodes. You can't always control the size and pin location on a node, but you can always control the location of a node and thus control the wires. Straight wires provide clear linear flow. Wiggly wires wear wits wickedly. You can straighten wires by using the Straighten Connections command with BP nodes selected. Hotkey: Q

Good example: The tops of the nodes are staggered to keep a perfectly straight white exec line.
![Aligned By Wires](https://github.com/Allar/ue5-style-guide/blob/main/images/bp-graphs-align-wires-good.png?raw=true "Aligned By Wires")

Bad Example: The tops of the nodes are aligned creating a wiggly white exec line.
![Bad](https://github.com/Allar/ue5-style-guide/blob/main/images/bp-graphs-align-wires-bad.png?raw=true "Wiggly")

Acceptable Example: Certain nodes might not cooperate no matter how you use the alignment tools. In this situation, try to minimize the wiggle by bringing the node in closer.
![Acceptable](https://github.com/Allar/ue5-style-guide/blob/main/images/bp-graphs-align-wires-acceptable.png?raw=true "Acceptable")

<a name="4.4.3"></a>
<a name="bp-graphs-exec-first-class"></a>
#### 4.4.3 White Exec Lines Are Top Priority

If you ever have to decide between straightening a linear white exec line or straightening data lines of some kind, always straighten the white exec line.

<a name="4.4.4"></a>
<a name="bp-graphs-block-comments"></a>
#### 4.4.4 Graphs Should Be Reasonably Commented

Blocks of nodes should be wrapped in comments that describe their higher-level behavior. While every function should be well named so that each individual node is easily readable and understandable, groups of nodes contributing to a purpose should have their purpose described in a comment block. If a function does not have many blocks of nodes and its clear that the nodes are serving a direct purpose in the function's goal, then they do not need to be commented as the function name and  description should suffice.

<a name="4.4.5"></a>
<a name="bp-graphs-cast-error-handling"></a>
#### 4.4.5 Graphs Should Handle Casting Errors Where Appropriate

If a function or event assumes that a cast always succeeds, it should appropriately report a failure in logic if the cast fails. This lets others know why something that is 'supposed to work' doesn't. A function should also attempt a graceful recover after a failed cast if it's known that the reference being casted could ever fail to be casted.

This does not mean every cast node should have its failure handled. In many cases, especially events regarding things like collisions, it is expected that execution flow terminates on a failed cast quietly.

<a name="4.4.6"></a>
<a name="bp-graphs-dangling-nodes"></a>
#### 4.4.6 Graphs Should Not Have Any Dangling / Loose / Dead Nodes

All nodes in all blueprint graphs must have a purpose. You should not leave dangling blueprint nodes around that have no purpose or are not executed.


<a name="5"></a>
<a name="Static Meshes"></a>
<a name="s"></a>
## 5. Static Meshes

This section will focus on Static Mesh assets and their internals.

<a name="5.1"></a>
<a name="s-uvs"></a>
### 5.1 Static Mesh UVs

If Linter is reporting bad UVs and you can't seem to track it down, open the resulting `.log` file in your project's `Saved/Logs` folder for exact details as to why it's failing. I am hoping to include these messages in the Lint report in the future.

<a name="5.1.1"></a>
<a name="s-uvs-no-missing"></a>
#### 5.1.1 All Meshes Must Have UVs

Pretty simple. All meshes, regardless how they are to be used, should not be missing UVs.

<a name="5.1.2"></a>
<a name="s-uvs-no-overlapping"></a>
#### 5.1.2 All Meshes Must Not Have Overlapping UVs for Lightmaps

Pretty simple. All meshes, regardless how they are to be used, should have valid non-overlapping UVs.

<a name="5.2"></a>
<a name="s-lods"></a>
### 5.2 LODs Should Be Set Up Correctly

This is a subjective check on a per-project basis, but as a general rule any mesh that can be seen at varying distances should have proper LODs.

<a name="5.3"></a>
<a name="s-modular-snapping"></a>
### 5.3 Modular Socketless Assets Should Snap To The Grid Cleanly

This is a subjective check on a per-asset basis, however any modular socketless assets should snap together cleanly based on the project's grid settings.

It is up to the project whether to snap based on a power of 2 grid or on a base 10 grid. However if you are authoring modular socketless assets for the marketplace, Epic's requirement is that they snap cleanly when the grid is set to 10 units or bigger.

<a name="5.4"></a>
<a name="s-collision"></a>
### 5.4 All Meshes Must Have Collision

Regardless of whether an asset is going to be used for collision in a level, all meshes should have proper collision defined. This helps the engine with things such as bounds calculations, occlusion, and lighting. Collision should also be well-formed to the asset.

<a name="5.5"></a>
<a name="s-scaled"></a>
### 5.5 All Meshes Should Be Scaled Correctly

This is a subjective check on a per-project basis, however all assets should be scaled correctly to their project. Level designers or blueprint authors should not have to tweak the scale of meshes to get them to confirm in the editor. Scaling meshes in the engine should be treated as a scale override, not a scale correction.


<a name="6"></a>
<a name="Niagara"></a>
<a name="ng"></a>
## 6. Niagara

This section covers Niagara VFX assets: how they are named, how a System relates to its Emitters, and how to keep an effect scalable and cullable.

<a name="6.1"></a>
<a name="ng-rules"></a>
### 6.1 No Spaces, Ever

As mentioned in [1.1 Forbidden Identifiers](#1), spaces and all white space characters are forbidden in identifiers. This is especially true for Niagara systems as it makes working with things significantly harder if not impossible when working with HLSL or other means of scripting within Niagara and trying to reference an identifier.

(Original Contribution by [@dunenkoff](https://github.com/Allar/ue5-style-guide/issues/58))

<a name="6.2"></a>
<a name="ng-system"></a>
### 6.2 A System Is The Placeable Asset

A Niagara System is the asset a level or a Blueprint places and references; a Niagara Emitter is a sub-asset the System consumes. Effects are spawned as Systems, never as bare Emitters.

Emitters, modules, and scripts are added from menus inside the Niagara editor rather than dragged from the Content Browser, so they do not need to be told apart by eye. Their prefixes in the [Effects table](#anc-effects) exist for search and for the Content Browser, not for authoring.

<a name="6.3"></a>
<a name="ng-naming"></a>
### 6.3 Naming

Niagara assets use the [Effects table](#anc-effects): `NS_` for a System, `NE_` for an Emitter, `NM_` for a Module Script, and `NP_` for a Parameter Collection (an instance suffixes `_I`). The `NS_` prefix matches Epic's own Niagara convention; there is no need for `FXS_` or `VFX_` variants.

<a name="6.4"></a>
<a name="ng-scalability"></a>
### 6.4 Scalability Belongs To The Effect Type

A System's quality, significance, and culling are driven by its [Effect Type](https://dev.epicgames.com/documentation/en-us/unreal-engine/scalability-and-best-practices-for-niagara), not by per-instance switches or Blueprint-side toggles. Define scalability once in the Effect Type so the effect behaves the same wherever it is spawned and can be scaled down for weaker targets without editing the System.

<a name="6.5"></a>
<a name="ng-bounds"></a>
### 6.5 Set Fixed Bounds

Every System must set fixed bounds covering the volume the effect can actually occupy. A System left on dynamic bounds, or with bounds that do not contain the effect, culls incorrectly: it pops out of view early, or never culls and keeps costing performance off screen.

<a name="6.6"></a>
<a name="ng-emitters"></a>
### 6.6 Pick The Right Emitter Sim Target

Use GPU emitters for high particle counts and anything purely visual. Use CPU emitters when the simulation has to read or write gameplay state, collide against the world, or when the count is small enough that a GPU emitter's overhead is not worth it. A CPU emitter chosen only "because it was easier" is a performance bug waiting to happen.

<a name="6.7"></a>
<a name="ng-reuse"></a>
### 6.7 Reuse Emitters And Modules

Prefer a shared emitter or module over a copied-and-tweaked one. A duplicated graph drifts: a fix applied to one copy is missed by the others, and a new near-identical asset appears in the Content Browser every time. Put the variation in an exposed parameter, not in a new copy.


<a name="7"></a>
<a name="Levels"></a>
<a name="levels"></a>
## 7. Levels / Maps

[See Terminology Note](#terms-level-map) regarding "levels" vs "maps".

This section will focus on Level assets and their internals.

<a name="7.1"></a>
<a name="levels-no-errors-or-warnings"></a>
### 7.1 No Errors Or Warnings

All levels should load with zero errors or warnings. If a level loads with any errors or warnings, they should be fixed immediately to prevent cascading issues.

You can run a map check on an open level in the editor by using the console command "map check".

Please note: Linter is even more strict on this than the editor is currently, and will catch load errors that the editor will resolve on its own.

<a name="7.2"></a>
<a name="levels-lighting-should-be-built"></a>
### 7.2 Lighting Should Be Built

It is normal during development for levels to occasionally not have lighting built. When doing a test/internal/shipping build or any build that is to be distributed however, lighting should always be built.

<a name="7.3"></a>
<a name="levels-no-visible-z-fighting"></a>
### 7.3 No Player Visible Z Fighting

Levels should not have any [z-fighting](https://en.wikipedia.org/wiki/Z-fighting) in all areas visible to the player.

<a name="7.4"></a>
<a name="levels-composition"></a>
### 7.4 Compose Levels From Isolated Components

A playable area is composed from multiple level components rather than built as one monolithic map. The persistent level is the composition root: it references and coordinates the components, but contains no directly authored gameplay, lighting, audio, geometry, or segment content. Treat it as glue only, and do not modify it as part of ordinary feature work.

Name the main component with the `_P` suffix. Split independently owned work into focused level components, using the established suffixes such as `_Gameplay`, `_Light`, `_Audio`, and `_Geo`; give additional world segments clear names such as `_Segment01`. Keep components separable so teammates can work on different areas without locking or changing the whole level. Put all Level Blueprint logic in the `_Gameplay` component. Do not put gameplay logic in the Persistent Level Blueprint.

This composition model reduces multi-person edit conflicts: each contributor can work in a specific component while the Persistent Level remains the stable assembly point. The Level panel example below shows a Persistent Level with separate gameplay, geometry, lighting, audio, and segment components.

![Example of a composed level with a Persistent Level and separate level components](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/level-composition-example.png)

<a name="7.5"></a>
<a name="levels-mp-rules"></a>
### 7.5 Marketplace Specific Rules

If a project is to be sold on the Unreal Engine Marketplace, it must follow these rules.

<a name="7.5.1"></a>
<a name="levels-mp-rules-overview"></a>
#### 7.5.1 Overview Level

If your project contains assets that should be visualized or demoed, you must have a map within your project that contains the name "Overview".

This overview map, if it is visualizing assets, should be set up according to [Epic's guidelines](https://www.unrealengine.com/en-US/marketplace-guidelines).

For example, `InteractionComponent_Overview`.

<a name="7.5.2"></a>
<a name="levels-mp-rules-demo"></a>
#### 7.5.2 Demo Level

If your project contains assets that should be demoed or come with some sort of tutorial, you must have a map within your project that contains the name "Demo". This level should also contain documentation within it in some form that illustrates how to use your project. See Epic's Content Examples project for good examples on how to do this.

If your project is a gameplay mechanic or other form of system as opposed to an art pack, this can be the same as your "Overview" map.

For example, `InteractionComponent_Overview_Demo`, `ExplosionKit_Demo`.


<a name="8"></a>
<a name="textures"></a>
## 8. Textures

This section will focus on Texture assets and their internals.

<a name="8.1"></a>
<a name="textures-dimensions"></a>
### 8.1 Dimensions Are Powers of 2

All textures, except for UI textures, must have its dimensions in multiples of powers of 2. Textures do not have to be square.

For example, `128x512`, `1024x1024`, `2048x1024`, `1024x2048`, `1x512`.

<a name="8.2"></a>
<a name="textures-density"></a>
### 8.2 Texture Density Should Be Uniform

All textures should be of a size appropriate for their standard use case. Appropriate texture density varies from project to project, but all textures within that project should have a consistent density.

For example, if a project's texture density is 8 pixel per 1 unit, a texture that is meant to be applied to a 100x100 unit cube should be 1024x1024, as that is the closest power of 2 that matches the project's texture density.

<a name="8.3"></a>
<a name="textures-max-size"></a>
### 8.3 Textures Should Be No Bigger than 8192

No texture should have a dimension that exceeds 8192 in size, unless you have a very explicit reason to do so. Often, using a texture this big is simply just a waste of resources.

<a name="8.4"></a>
<a name="textures-group"></a>
### 8.4 Textures Should Be Grouped Correctly

Every texture has a Texture Group property used for LODing, and this should be set correctly based on its use. For example, all UI textures should belong in the UI texture group.



